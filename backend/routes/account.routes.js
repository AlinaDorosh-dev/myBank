/**
 * @fileoverview This file contains all account routes for the account controller
 */
const express = require("express");
const router = express.Router();
const {
  getUsersAccounts,
  getAccountByNumber,
  createNewAccount,
  desactivateAccount,
} = require("../controllers/account.controller");

const verifyToken = require("../middleware/verifyToken");

router.route("/").get(verifyToken, getUsersAccounts);
router.route("/validate/:number").get(verifyToken, getAccountByNumber);
router.route("/new").post(verifyToken, createNewAccount);
router.route("/desactivate").patch(verifyToken, desactivateAccount);
module.exports = router;
