const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");

let authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }

    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "invalid tokens",
      });
    }

    let user = await UserModel.findById(decode.id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = authMiddleware;
