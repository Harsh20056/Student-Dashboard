const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const getProfileController = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await UserModel.findById(id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    let { name, email } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true },
    );
    res.status(202).json({
      success: true,
      message: "updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changePasswordController=async (req, res)=>{
    try {
        const {oldPassword, newPassword}=req.body
        const user_id=req.params.id;
        const user= await UserModel.findById(user_id)

        const isMatch=await bcrypt.compare(oldPassword , user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password incorrect",
            });
        }

        const hashPass=await bcrypt.hash(newPassword, 10);

        user.password=hashPass
        await user.save()
        res.status(200).json({
            success: true, 
            message :"Password updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = { getProfileController , changePasswordController, updateProfileController};
