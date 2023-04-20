/**
 * @fileoverview This file contains all notification routes for the notification controller
 */

const express = require("express");
const router = express.Router();

const {
  getUsersNotifications,
  updateNotification,
} = require("../controllers/notification.controller");

const verifyToken = require("../middleware/verifyToken");

router.route("/").get(verifyToken, getUsersNotifications);
router.route("/:id").patch(verifyToken, updateNotification);

module.exports = router;
