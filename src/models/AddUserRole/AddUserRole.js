const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  userType: { type: String, required: true },
  verified: { type: Boolean, default: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  isActive: { type: Boolean, default: true },
  profilePicture: { type: String },
  address: { type: String },
  lastLogin: { type: Date },
}, { timestamps: true });

const User = mongoose.model("Users", UserSchema);

module.exports = User;