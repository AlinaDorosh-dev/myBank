/**
 * @fileoverview This file contains the error handler middleware function, it is used to handle any errors that occur in the application, it logs the error to a file and returns a json object with the error message and stack trace
 * 
 */

const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const statusCode = res.statusCode ? res.statusCode : 500; // server error

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
