require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const { logger,logEvents } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");

const errorHandler = require("./middleware/errorHandler");

connectDB();

const db = mongoose.connection;

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());


app.use(express.json());

app.use(express.urlencoded({ extended: false }));


//app.use(cookieParser);
app.use(logger);

app.use("/auth", require("./routes/auth.routes"));
app.use("/accounts", require("./routes/account.routes"));
app.use(errorHandler)
db.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
  
  db.on("error", (err) => {
    console.log(err);
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
  });

  db.on("disconnected", () => {
    console.log("Mongoose default connection is lost");
    logEvents(
      `Database connection is lost`,
      "mongoErrLog.log"
    );
  });
  