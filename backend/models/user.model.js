const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: Number,
    minlength: 5,
    maxlength: 5,
  },
  country: {
    type: String,
    default: "Spain",
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
    unique: true,
    trim: true,
    required: [true, "can't be blank"],
  },

  pwdHash: {
    type: String,
    required: true,
    trim: true,
    minlength: 60,
    maxlength: 60,
  },

  documentType: {
    type: String,
    enum: ["dni", "nie"],
    trim: true,
  },

  documentNumber: {
    type: String,
    trim: true,
    minlength: 9,
    unique: true,
    index: true,
    sparse: true,
  },

  registerAt: {
    type: Date,
    immutable: true,
    required: true,
  },
  lastLogin: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: Number,
    unique: true,
    index: true,
    sparse: true,
    minlength: 9,
    maxlength: 9,
  },

  address: addressSchema,

  birthDate: {
    type: Date,
  },

  userVerified: { type: Boolean, default: false },

  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    trim: true,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
