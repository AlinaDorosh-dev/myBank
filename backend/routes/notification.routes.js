/**
 * @fileoverview This file contains all notification routes for the notification controller
 */

const express = require("express");
const router = express.Router();

const {
  getUsersNotifications,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification.controller");

const verifyToken = require("../middleware/verifyToken");

router.route("/").get(verifyToken, getUsersNotifications);
router
  .route("/:id")
  .patch(verifyToken, updateNotification)
  .delete(verifyToken, deleteNotification);

module.exports = router;
