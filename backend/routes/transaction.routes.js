const express = require("express");
const router = express.Router();

const {
  transactionController,
  getTransactionsByUser,
} = require("../controllers/transaction.controller");

const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .post(verifyToken, transactionController)
  .get(verifyToken, getTransactionsByUser);

module.exports = router;
