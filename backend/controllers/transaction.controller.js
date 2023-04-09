const asyncHandler = require("express-async-handler");
const Account = require("../models/account.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");

const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

//@desc new transaction
//@route POST /transactions
//@access Private
const transactionController = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "failed", data: null, error: "Unauthorized" });
  }
  const { amount, description, destinationAcc, sourceAcc } = req.body;

  const foundSourceAccount = await Account.findById(sourceAcc);
  const foundDestinationAccount = await Account.findById(destinationAcc);

  switch (true) {
    case !amount || !description || !destinationAcc || !sourceAcc:
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Transaction information is incomplete",
      });

    case amount <= 0:
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Amount must be greater than 0",
      });
    case sourceAcc === destinationAcc:
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Source and destination accounts must be different",
      });
    case !foundSourceAccount:
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Source account does not exist",
      });
    case !foundDestinationAccount:
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Destination account does not exist",
      });
    case req.user.id !== foundSourceAccount.user.toString():
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Source account does not belong to the user",
      });

    case foundSourceAccount.balance < amount:
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Source account does not have enough ballance",
      });

    case description.length < 5 || description.length > 100:
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Description must be between 5 and 100 characters",
      });
  }

  try {
    const newTransaction = await Transaction.create({
      amount,
      description,
      destinationAcc,
      sourceAcc,
      date: new Date(),
    });

    await Account.findByIdAndUpdate(sourceAcc, {
      $push: { pendingTransactions: newTransaction._id },
    });

    const client = new MongoClient(process.env.DATABASE_URI);

    // The accounts collection in the banking database
    const accountsCollection = client.db("myBank").collection("accounts");

    // Step 1: Start a Client Session
    const session = client.startSession();

    // Step 2: Optional. Define options for the transaction
    const transactionOptions = {
      readPreference: "primary",
      readConcern: { level: "local" },
      writeConcern: { w: "majority" },
    };

    try {
      // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
      const transactionResults = await session.withTransaction(async () => {
        // Remove the money from the first account
        const subtractMoneyResults = await accountsCollection.updateOne(
          { _id: new ObjectId(sourceAcc) },
          { $inc: { balance: amount * -1 } },
          { session }
        );

        console.log(
          `${subtractMoneyResults.matchedCount} document(s) found in the accounts collection with _id ${sourceAcc}.`
        );
        console.log(
          `${subtractMoneyResults.modifiedCount} document(s) was/were updated to remove the money.`
        );
        if (subtractMoneyResults.modifiedCount !== 1) {
          await session.abortTransaction();
          await Transaction.findByIdAndUpdate(newTransaction._id, {
            status: "canceled",
          });
          await Account.findByIdAndUpdate(sourceAcc, {
            $pull: { pendingTransactions: newTransaction._id },
          });
          res
            .status(400)
            .json({ status: "failed", data: null, error: error.message });
          return;
        }

        // Add the money to the second account
        const addMoneyResults = await accountsCollection.updateOne(
          { _id: new ObjectId(destinationAcc) },
          { $inc: { balance: amount } },
          { session }
        );
        console.log(
          `${addMoneyResults.matchedCount} document(s) found in the accounts collection with _id ${destinationAcc}.`
        );
        console.log(
          `${addMoneyResults.modifiedCount} document(s) was/were updated to add the money.`
        );
        if (addMoneyResults.modifiedCount !== 1) {
          await session.abortTransaction();
          await Transaction.findByIdAndUpdate(newTransaction._id, {
            status: "canceled",
          });
          await Account.findByIdAndUpdate(sourceAcc, {
            $pull: { pendingTransactions: newTransaction._id },
          });

          res
            .status(400)
            .json({ status: "failed", data: null, error: error.message });
          return;
        }
      }, transactionOptions);

      if (transactionResults) {
        console.log(
          "The money was successfully transferred. Database operations from the transaction are now visible outside the transaction."
        );
        await Transaction.findByIdAndUpdate(newTransaction._id, {
          status: "completed",
        });

        await Account.findByIdAndUpdate(sourceAcc, {
          $pull: { pendingTransactions: newTransaction._id },
        });

        const benefactor = await User.findById(foundSourceAccount.user);

        const newNotification = await Notification.create({
          user: foundDestinationAccount.user,
          message: `You have received a new transaction from ${benefactor.firstName} ${benefactor.lastName} for ${amount}€`,
        });

        await User.findByIdAndUpdate(foundDestinationAccount.user, {
          $push: { notifications: newNotification._id },
        });
        res
          .status(200)
          .json({ status: "succeeded", data: newTransaction, error: null });
      } else {
        console.log(
          "The money was not transferred. The transaction was intentionally aborted."
        );
        await Transaction.findByIdAndUpdate(newTransaction._id, {
          status: "canceled",
        });
        await Account.findByIdAndUpdate(sourceAcc, {
          $pull: { pendingTransactions: newTransaction._id },
        });
        res
          .status(400)
          .json({ status: "failed", data: null, error: error.message });
      }
    } catch (e) {
      console.log(
        "The money was not transferred. The transaction was aborted due to an unexpected error: " +
          e
      );
      await Transaction.findByIdAndUpdate(newTransaction._id, {
        status: "canceled",
      });
      await Account.findByIdAndUpdate(sourceAcc, {
        $pull: { pendingTransactions: newTransaction._id },
      });
      res
        .status(400)
        .json({ status: "failed", data: null, error: error.message });
    } finally {
      // Step 4: End the session
      await session.endSession();
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", data: null, error: error.message });
  }
});

// const getTransactionsByAccount = asyncHandler(async (req, res) => {

//   const incomingTransactions = await Transaction.find({}).populate({});

//   const transactions = await Transaction.find({
//     $or: [{ sourceAcc: req.params.id }, { destinationAcc: req.params.id }],
//   })
//     .populate("sourceAcc")
//     .populate("destinationAcc");

//   res.status(200).json({ status: "succeeded", data: transactions, error: null });
// });

module.exports = transactionController;
