const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

// @desc Login
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({
      status: "failed",
      data: null,
      message: "Missing some required fields",
    });
  }

  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser || !foundUser.active) {
      return res.status(401).json({
        message: "Unauthorized",
        data: null,
        error: "Wrong email or password provided",
      });
    } else {
      const match = await bcrypt.compare(password, foundUser.pwdHash);
      if (!match) {
        return res.status(401).json({
          message: "Unauthorized",
          data: null,
          error: "Wrong email or password provided",
        });
      } else {
        const accessToken = generateAccessToken(foundUser);
        const refreshToken = generateRefreshToken(foundUser);
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          status: "success",
          accessToken,
          message: "Logged in successfully",
        });
        await User.findByIdAndUpdate(
          foundUser._id,
          { lastLogin: new Date() },
          { new: true }
        ).exec();
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "failed",
      data: null,
      error: error.message,
    });
  }
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.headers.cookie;
  const refreshToken = cookies.split("=")[1].split(";")[0].replace(/"/g, "");
  if (!cookies || !refreshToken)
    return res
      .status(401)
      .json({ status: "failed", data: null, message: "Unauthorized" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ status: "failed", data: null, message: "Forbidden" });

      const foundUser = await User.findOne({ email: decoded.email }).exec();

      if (!foundUser)
        return res
          .status(401)
          .json({ status: "failed", data: null, message: "Unauthorized" });

      const accessToken = generateAccessToken(foundUser);

      res.json({
        status: "success",
        data: accessToken,
        message: "Access token generated",
      });
    }
  );
});

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV !== "development",
  }); //if not development set secure to true
  res.json({ status: "success", data: null, message: "Cookie cleared" });
};

module.exports = { login, refresh, logout };
