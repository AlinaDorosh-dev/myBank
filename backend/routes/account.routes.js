const express = require("express");
const router = express.Router();
const {
  getUsersAccounts,
  createNewAccount,
  desactivateAccount,
} = require("../controllers/account.controller");

const verifyToken = require("../middleware/verifyToken");

router.route("/").get(verifyToken, getUsersAccounts);
router.route("/new").post(verifyToken, createNewAccount);
router.route("/desactivate").patch(verifyToken, desactivateAccount);
module.exports = router;
