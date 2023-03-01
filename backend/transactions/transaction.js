/**
 * Transfer money from one bank account to another using
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the banking database
 * @param {String} sourceAccount The _id of the account where money should be subtracted
 * @param {String} destinationAccount The _id of the account where money should be added
 * @param {Number} amount The amount of money to be transferred
 */
async function transferMoney(
  client,
  sourceAccount,
  destinationAccount,
  amount
) {
  /**
   * The accounts collection in the banking database
   */
  const accountsCollection = client.db("myBank").collection("accounts");

  // Step 1: Start a Client Session
  // See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html#startSession for the startSession() docs
  const session = client.startSession();

  // Step 2: Optional. Define options for the transaction
  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };

  try {
    // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
    // Note: The callback for withTransaction MUST be async and/or return a Promise.
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/ClientSession.html#withTransaction for the withTransaction() docs
    const transactionResults = await session.withTransaction(async () => {
      // Important:: You must pass the session to each of the operations

      // Remove the money from the first account
      const subtractMoneyResults = await accountsCollection.updateOne(
        { _id: sourceAccount },
        { $inc: { balance: amount * -1 } },
        { session }
      );
      console.log(
        `${subtractMoneyResults.matchedCount} document(s) found in the accounts collection with _id ${sourceAccount}.`
      );
      console.log(
        `${subtractMoneyResults.modifiedCount} document(s) was/were updated to remove the money.`
      );
      if (subtractMoneyResults.modifiedCount !== 1) {
        await session.abortTransaction();
        return;
      }

      // Add the money to the second account
      const addMoneyResults = await accountsCollection.updateOne(
        { _id: destinationAccount },
        { $inc: { balance: amount } },
        { session }
      );
      console.log(
        `${addMoneyResults.matchedCount} document(s) found in the accounts collection with _id ${destinationAccount}.`
      );
      console.log(
        `${addMoneyResults.modifiedCount} document(s) was/were updated to add the money.`
      );
      if (addMoneyResults.modifiedCount !== 1) {
        await session.abortTransaction();
        return;
      }
    }, transactionOptions);

    if (transactionResults) {
      console.log(
        "The money was successfully transferred. Database operations from the transaction are now visible outside the transaction."
      );
    } else {
      console.log(
        "The money was not transferred. The transaction was intentionally aborted."
      );
    }
  } catch (e) {
    console.log(
      "The money was not transferred. The transaction was aborted due to an unexpected error: " +
        e
    );
  } finally {
    // Step 4: End the session
    await session.endSession();
  }
}

module.exports = transferMoney;
