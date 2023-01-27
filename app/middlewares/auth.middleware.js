require("dotenv").config();
const jwt = require("jsonwebtoken");
const userService = require("../services/auth.service");

exports.assignToken = async (user) => {
  let token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });
  return token;
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Please send authentication token.",
      });
    }
    const decode = await jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (decode) {
      const user = await userService.getUserById(decode.id);
      if (user) {
        req.userData = user;
      } else {
        return res.status(400).json({
          status: false,
          message: "User cannot access or no user exits",
        });
      }
    }
    return next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Unauthorized access.",
    });
  }
};
