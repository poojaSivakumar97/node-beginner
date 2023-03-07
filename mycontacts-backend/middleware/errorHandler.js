const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      {
        res.json({
          title: "Validation Error",
          message: err.message,
          stackTrace: err.stackTrace,
        });
      }
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Not Authorised",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      break;
  }
};
module.exports = errorHandler;
