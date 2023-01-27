const { body } = require("express-validator");

const createUserValidationRule = () => {
  return [
    body("firstName").isString().withMessage("Please enter valid first name."),
    body("lastName").isString().withMessage("Please enter valid last name."),
    body("email").isString().isEmail().withMessage("Please Enter valid Email."),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password length should be at least 6 char."),
  ];
};

module.exports = {
  createUserValidationRule,
};
