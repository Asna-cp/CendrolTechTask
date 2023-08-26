const express = require("express");
const profilePictureUpload = require("../MulterConfig/multer");

// const controller = require('../Controller/userContrl')

// const controller = require('../Controller/userContrl');

const {
  registerController,
  allusers,
  deleteUsers,
  getUserById,
  updateUsers,
  Login,
} = require("../Controller/userContrl");

//router
const router = express.Router();

//REGISTER || POST
router.post(
  "/register",
  profilePictureUpload.single("profilepicture"),
  registerController
);
router.post("/login", Login);

router.post("/deleteUser/:id", deleteUsers);
router.post("/updateUser/:id", updateUsers);

router.get("/alluser", allusers);
router.get("/getUser/:id", getUserById);

module.exports = router;
