/**
 * @fileoverview This file contains the schema for the transaction model, it is used to create documents in the transactions collection in the database
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  amount: { type: Number, required: true, immutable: true },

  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    immutable: true,
  },

  date: { type: Date, required: true, immutable: true },

  destinationAcc: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    immutable: true,
  },

  sourceAcc: { type: Schema.Types.ObjectId, ref: "Account", immutable: true },

  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    required: true,
    default: "pending",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
