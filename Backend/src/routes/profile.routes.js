const express=require('express');
const { getProfileController, updateProfileController, changePasswordController } = require('../controllers/profile.controllers');

const router=express.Router()

router.get("/:id", getProfileController);

router.put("/:id", updateProfileController);

router.put("/:id/change-password", changePasswordController);

module.exports=router