const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Account = require("../models/account.model");

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

const createNewAccount = asyncHandler(async (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ status: "failed", data: null, error: "Unauthorized" });
  try {
    const newAccount = await Account.create({
      user: req.user.id,
      number: `ES99 1234 5555 6666 ${Math.floor(Math.random() * 100000000)}`,
      balance: 0,
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


module.exports = { getUsersAccounts, createNewAccount };