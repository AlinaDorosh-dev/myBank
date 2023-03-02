const express = require("express");
const router = express.Router();
const { createNewUser,updateUser } = require("../controllers/user.controller");
const { login, refresh, logout } = require("../controllers/auth.controller");
const loginLimiter = require("../middleware/loginLimiter");
const verifyToken = require("../middleware/verifyToken");

router.route("/signup").post(createNewUser);

router.route("/login").post(loginLimiter, login);

router.route("/refresh").get(refresh);

router.route("/user/:id").patch(verifyToken,updateUser);

router.route("/logout").post(logout);

module.exports = router;
