const { body } = require("express-validator");

module.exports = {
  addUser: [
    body("name", "Name is required.").isString().notEmpty(),
    body("email", "Email is invalid.").isString().isEmail().notEmpty(),
    body("password", "Password should be of atleast 8 charecters.")
      .isString()
      .isLength({ min: 8 }),
  ],
  loginUser: [
    body("email", "Email is invalid.").isString().isEmail().notEmpty(),
  ]
};
