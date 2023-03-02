const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
// @desc Create new user
// @route POST /signup
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Confirm data
  if (!password || !email) {
    return res.status(400).json({
      status: "failed",
      data: null,
      message: "All fields are required",
    });
  }
  // Check for duplicate email
  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({
      status: "failed",
      data: null,
      message: "This email is already registered",
    });
  }

  try {
    const newUser = new User({
      email,
      pwdHash: await bcrypt.hash(password, 10),
      registerAt: new Date(),
      lastLogin: new Date(),
    });
    newUser.save().then((newUser) => {
      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: process.env.NODE_ENV !== "development", //if https set to true
        //cross-site cookie sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refreshToken expiry
      });
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        accessToken,
      });
    });
  } catch (error) {
    if (error.message === "data and salt arguments required") {
      res.status(422).json({
        status: "failed",
        data: null,
        message:
          "Password is required, please insert a valid password and try again",
      });
    }

    if (error.code == 11000 || duplicate) {
      return res.status(409).json({
        status: "failed",
        message: "This email is already registered",
        data: null,
      });
    }
    return res
      .status(400)
      .json({ status: "failed", data: null, message: error.message });
  }
});

// @desc Update user profile
// @route PATCH auth/user/:id
// @access Private

const updateUser = asyncHandler(async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);

    // Check for user
    if (!req.user || !foundUser) {
      res.status(401);
      throw new Error("User not found");
    }
    //encrypt password if it is provided
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body.password
        ? { ...req.body, password: await bcrypt.hash(req.body.password, 10) }
        : req.body,
      {
        new: true,
      }
    );

    res.status(200).json({ status: "succeeded", updatedUser, error: null });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failed", data: null, message: error.message });
  }
});

module.exports = {
  createNewUser, 
  updateUser, 
};
