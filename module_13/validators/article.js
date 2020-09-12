const { body } = require("express-validator");

module.exports = {
  addArticle: [
    body("name", "Name is required.").isString().notEmpty(),
    body("content", "Content should be of atleast 50 charecters.")
      .isString()
      .isLength({ min: 50 }),
  ],
};
