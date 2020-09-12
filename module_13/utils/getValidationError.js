const { validationResult } = require("express-validator");

module.exports = function (req) {
  const errors = validationResult(req).array();
  const fieldErrors = {};
  for (const error of errors) {
    if (error.param && !fieldErrors[error.param])
      fieldErrors[error.param] = error.msg;
  }
  return fieldErrors;
};
