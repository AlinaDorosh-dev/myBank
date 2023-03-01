const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  destinationAccount: { type: Schema.Types.ObjectId, ref: "Account" },
  sourceAccount: { type: Schema.Types.ObjectId, ref: "Account" },
  timestamps: true,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
