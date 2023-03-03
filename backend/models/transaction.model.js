const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({

  amount: { type: Number, required: true },

  description: { type: String, required: true },

  date: { type: Date, required: true },

  destinationAcc: { type: Schema.Types.ObjectId, ref: "Account" },

  sourceAcc: { type: Schema.Types.ObjectId, ref: "Account" },

  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    required: true,
    default: "pending",
  },
    
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
