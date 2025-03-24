const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  accessType: { type: String, enum: ["public", "private"], required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  githubRepo: { type: String },
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;