const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction.controller");

const verifyToken = require("../middleware/verifyToken");

router.route("/").post(verifyToken, transactionController);

module.exports = router;
