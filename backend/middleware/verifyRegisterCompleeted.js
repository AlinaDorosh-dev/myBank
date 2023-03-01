// const User = require("../models/user.model");

// const verifyRegisterCompleeted = async (req, res, next) => {
//   const user = await User.find({ _id: req.user.id });
//   if (!user || !user.active || !user.userVerified) {
//     return res
//       .status(401)
//       .json({ status: "failed", data: null, error: "Unauthorized" });
//   }

//   const requiredFields = [
//     "firstName",
//     "lastName",
//     "phone",
//     "address",
//     "birthDate",
//     "dniPhoto",
//     "documentType",
//     "documentNumber",
//   ];

//   const missingFields = requiredFields.filter((field) => !user[field]);
//   if (missingFields.length > 0) {
//     return res
//       .status(401)
//       .json({ status: "failed", data: null, error: "Unauthorized" });
//   }
//   console.log("verifyRegisterCompleeted: OK");
//   next();
// };

// module.exports = verifyRegisterCompleeted;
