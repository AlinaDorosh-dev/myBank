const asyncHandler = require("express-async-handler");
const Account = require("../models/account.model");
const User = require("../models/user.model");


//@desc Get all accounts from a user
//@route GET /accounts
//@access Private
const getUsersAccounts = asyncHandler(async (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ status: "failed", data: null, error: "Unauthorized" });
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.status(200).json({ status: "succeeded", data: accounts, error: null });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", data: null, error: error.message });
  }
});

//@desc Create a new account
//@route POST /accounts/new
//@access Private
const createNewAccount = asyncHandler(async (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ status: "failed", data: null, error: "Unauthorized" });
  try {
    const newAccount = await Account.create({
      user: req.user.id,
      number: `ES99 1234 5555 6666 ${Math.floor(Math.random() * 100000000)}`,
      createdAt: new Date(),
    });

    //add account to users accounts array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { accounts: newAccount._id },
    });

    res
      .status(200)
      .json({ status: "succeeded", data: newAccount, error: null });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", data: null, error: error.message });
  }
});


//@desc Desactivate an account
//@route PATCH /accounts/desactivate
//@access Private
const desactivateAccount = asyncHandler(async (req, res) => {
  //only for desactivating accounts
  if (!req.user)
    return res
      .status(401)
      .json({ status: "failed", data: null, error: "Unauthorized" });
  try {
    const foundAccount = await Account.findById(req.body.id);
    if (!foundAccount) {
      return res
        .status(400)
        .json({ status: "failed", data: null, error: "Account not found" });
    }
    if (foundAccount.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ status: "failed", data: null, error: "Unauthorized" });
    }
    if (foundAccount.balance !== 0) {
      return res
        .status(400)
        .json({ status: "failed", data: null, error: "Account not empty" });
    }

    const updatedAccount = await Account.findByIdAndUpdate(req.body.id, {
      active: false,
    });

    res
      .status(200)
      .json({ status: "succeeded", data: updatedAccount, error: null });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", data: null, error: error.message });
  }
});

module.exports = { getUsersAccounts, createNewAccount, desactivateAccount };
