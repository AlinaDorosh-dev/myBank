const express = require("express");
const router = express.Router();
const {
  createNewUser,
  updateUser,
  uploadDocument,
} = require("../controllers/user.controller");
const { login, refresh, logout } = require("../controllers/auth.controller");
const loginLimiter = require("../middleware/loginLimiter");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/uploadDocument");

router.route("/signup").post(createNewUser);

router.route("/login").post(loginLimiter, login);

router.route("/refresh").get(refresh);

router.route("/user/:id").patch(verifyToken, updateUser);

//router.route("/user/upload/:id").post(verifyToken, upload.single("users_document"), uploadDocument);

router
  .route("/user/upload")
  .post(upload.single("users_document"), uploadDocument);

router.route("/logout").post(logout);

module.exports = router;
