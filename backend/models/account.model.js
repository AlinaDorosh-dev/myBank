/**
 * @fileoverview This file contains the schema for the account model, it is used to create documents in the accounts collection in the database
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  
  number: {
    type: String,
    required: true,
    unique: true,
    length: 24,
    immutable: true,
  },

  currency: { type: String, required: true, default: "EUR", immutable: true },

  createdAt: { type: Date, required: true, immutable: true },

  balance: { type: Number, required: true, default: 100 },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },

  active: { type: Boolean, required: true, default: true },
  pendingTransactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  lastTransaction: { type: Date },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;


