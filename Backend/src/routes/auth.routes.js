const cookieParser = require("cookie-parser");
const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  forgetPasswordController,
  resetPasswordController,
  updatePasswordController,
} = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);

router.post("/forget-password", forgetPasswordController);
router.get("/reset-password/:token", resetPasswordController);
router.post("/update-password/:userId", updatePasswordController);


module.exports = router;
