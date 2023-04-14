const express = require("express");
const router = express.Router();
const { createNewUser, updateUser } = require("../controllers/user.controller");
const { login } = require("../controllers/auth.controller");
const loginLimiter = require("../middleware/loginLimiter");
const verifyToken = require("../middleware/verifyToken");

router.route("/signup").post(createNewUser);

router.route("/login").post(loginLimiter, login);

router.route("/user/:id").patch(verifyToken, updateUser);

module.exports = router;
