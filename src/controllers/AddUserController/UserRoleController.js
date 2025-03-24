const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../models/AddUserRole/AddUserRole");
const transporter = require("../../utils/emailConfig");
const { v4: uuidv4 } = require("uuid");

const RESPONSE_MESSAGES = {
  EMAIL_TAKEN: "Email is already taken",
  MOBILE_TAKEN: "Mobile number is already taken",
  USERNAME_TAKEN: "Username is already taken",
  SERVER_ERROR: "Server error",
};

const generateToken = () => uuidv4();

const isFieldTaken = async (field, value, errorMessage) => {
  const existingUser = await User.findOne({ [field]: value });
  return existingUser ? { success: false, error: errorMessage } : null;
};

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, mobileNumber, userType, role, organization, teams } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const emailTaken = await isFieldTaken("email", email, RESPONSE_MESSAGES.EMAIL_TAKEN);
    if (emailTaken) return res.status(400).json(emailTaken);

    const mobileTaken = await isFieldTaken("mobileNumber", mobileNumber, RESPONSE_MESSAGES.MOBILE_TAKEN);
    if (mobileTaken) return res.status(400).json(mobileTaken);

    const usernameTaken = await isFieldTaken("username", username, RESPONSE_MESSAGES.USERNAME_TAKEN);
    if (usernameTaken) return res.status(400).json(usernameTaken);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, username, email, password: hashedPassword, mobileNumber, userType, role, organization, teams });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: RESPONSE_MESSAGES.SERVER_ERROR });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role organization teams");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: RESPONSE_MESSAGES.SERVER_ERROR });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role organization teams");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: RESPONSE_MESSAGES.SERVER_ERROR });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.OTPNumber !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    user.verified = true;
    user.OTPNumber = null;
    await user.save();
    res.status(200).json({ success: true, message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: RESPONSE_MESSAGES.SERVER_ERROR });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const resetToken = generateToken();
    user.resetToken = resetToken;
    await user.save();
    res.status(200).json({ success: true, message: "Reset link sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: RESPONSE_MESSAGES.SERVER_ERROR });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: RESPONSE_MESSAGES.SERVER_ERROR });
  }
};
exports.updateUser = async (userId, updateData) => {
    try {
      return await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      throw error;
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const adminId = req.params.id;
      const token = req.headers.authorization?.split(" ")[1]; // Extract token
      if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
      }
  
      // Verify the token
      let decoded;
      try {
        decoded = jwt.verify(token, "ems47524752"); // Use the same secret key used in login
      } catch (err) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
      }
      console.log(decoded,"decoded");
      
      // Check if the admin with the given ID exists
      const adminToDelete = await User.findById(adminId);

      if (!adminToDelete) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      // Delete the admin and associated user
      await User.deleteOne({ _id: adminId });

      res.status(200).json({
        success: true,
        message: "User and associated user deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };