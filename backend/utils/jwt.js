const jwt = require("jsonwebtoken");

 const generateAccessToken = (user) => {
  const payload = {
    UserInfo: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
}

 const generateRefreshToken = (user) => {
  const payload = {
    email: user.email,
  };
  const options = {
    expiresIn: "7d",
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
}

module.exports = {generateAccessToken, generateRefreshToken}