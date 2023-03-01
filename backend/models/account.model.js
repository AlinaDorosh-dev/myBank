const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  number: { type: String, required: true, unique: true, length: 24 },

  balance: { type: Number, required: true },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  active: { type: Boolean, required: true, default: true },

  lastTransaction: { type: Date },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

//TODO:

// transactionType: {
//   type: String,
//   enum: ["credit", "debit"],
//   required: true,
// },
// cards:[{ type: Schema.Types.ObjectId, ref: "Card" }],
// creditLimit: { type: Number, required: true, default: 0 },
