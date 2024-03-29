/**
 * @fileoverview This file contains the schema for the notification model, it is used to create documents in the notifications collection in the database
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
    immutable: true,
  },
  date: {
    type: Date,
    required: true,
    immutable: true,
    default: Date.now,
  },
  read: { type: Boolean, default: false },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
