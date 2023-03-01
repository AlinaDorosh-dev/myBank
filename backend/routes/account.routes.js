const express = require("express");
const router = express.Router();
const {
  getUsersAccounts,
  createNewAccount,
} = require("../controllers/account.controller");

const verifyToken = require("../middleware/verifyToken");

router.route("/").get(verifyToken, getUsersAccounts);
router.route("/new").post(verifyToken, createNewAccount);
module.exports = router;
