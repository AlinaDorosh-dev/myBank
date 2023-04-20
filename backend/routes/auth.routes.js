/**
 * @fileoverview This file contains all routes for the user controller and the auth controller
 */

const express = require("express");
const router = express.Router();
const {
  createNewUser,
  updateUser,
  getUserProfile,
} = require("../controllers/user.controller");
const { login } = require("../controllers/auth.controller");
const loginLimiter = require("../middleware/loginLimiter");
const verifyToken = require("../middleware/verifyToken");

router.route("/signup").post(createNewUser);

router.route("/login").post(loginLimiter, login);

router
  .route("/user/:id")
  .patch(verifyToken, updateUser)
  .get(verifyToken, getUserProfile);

module.exports = router;
