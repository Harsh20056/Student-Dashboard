const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMailTo = require("../services/mail.service");

const registerController = async (req, res) => {
  try {
    let { name, email, mobile, rollno, password } = req.body;

    if (!name || !email || !mobile || !rollno || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let isExisted = await UserModel.findOne({ email });
    if (isExisted) {
      return res.status(409).json({
        success: false,
        message: "User already existed",
      });
    }

    let hassPass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      name,
      password: hassPass,
      email,
      mobile,
      rollno,
    });

    let token = await jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "User Login successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const logoutController = (req, res) => {
  try {
    let user_id = req.user._id;

    if (!user_id) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User logged out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const forgetPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    let isExisted = await UserModel.findOne({
      email,
    });

    if (!isExisted) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    let rawToken = jwt.sign({ id: isExisted._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    let resetLink = `https://student-dashboard-ry9a.onrender.com/api/auth/reset-password/${rawToken}`;

    await sendMailTo(
      email,
      "reset password",
      `<a href='${resetLink}'> click here</a>`,
    );
    return res.status(200).json({
      success: true,
      message: "Reset link sent",
    });
  } catch (error) {
    console.log("error in fp api", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    let token = req.params.token;

    if (!token) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorize request",
      });
    }

    let user = await UserModel.findById(decode.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorize request",
      });
    }
    return res.render("reset.ejs", { id: user._id });
  } catch (error) {
    console.log("error in fp api", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

let updatePasswordController = async (req, res) => {
  try {
    let userId = req.params.userId;

    if (!userId)
      return res.status(400).json({
        message: "Invalid request",
      });

    let { password } = req.body;

    if (!password)
      return res.status(400).json({
        message: "Invalid request",
      });

    let hashPass = await bcrypt.hash(password, 10);

    let updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        password: hashPass,
      },
      {
        new: true,
      },
    );
    return res.redirect("https://student-dashboard-ry9a.onrender.com/login?message=Password updated successfully. Please login with your new password.");
  } catch (error) {
    console.log("error in UP api", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  forgetPasswordController,
  resetPasswordController,
  updatePasswordController,
};
