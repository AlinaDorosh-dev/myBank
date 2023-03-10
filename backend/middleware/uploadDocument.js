const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage/users_documents");
  },
  filename: function (req, file, cb) {
    //replace name with date.now() to avoid duplicate file names
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
