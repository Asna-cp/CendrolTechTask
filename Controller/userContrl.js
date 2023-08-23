const userModel = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require(`jsonwebtoken`);

//CREATE USER

const registerController = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, phoneNumber, profilepicture, email, password } = req.body;
    // const profilepicture = req.file;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      fullName,
      phoneNumber,
      profilepicture: profilepicture.filename,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
};

//ALL USERS
const allusers = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.json(user);
  } catch (error) {
    res.json(error);
  }
};

//Get ONE User
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE USER
const deleteUsers = async (req, res) => {
  let id = req.params.id;
  await userModel.findByIdAndDelete({ _id: id });
  res.json("success");
};

//UPDATE USER
const updateUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName, phoneNumber, profilepicture, email } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user properties
    user.fullName = fullName;
    user.phoneNumber = phoneNumber;
    user.profilepicture = profilepicture;
    user.email = email;
    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

module.exports = {
  registerController,
  allusers,
  deleteUsers,
  getUserById,
  updateUsers,
};
