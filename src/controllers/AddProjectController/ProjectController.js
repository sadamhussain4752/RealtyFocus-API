// controllers/projectController.js
const Project = require("../../models/AddProject/AddProject");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, owner, startDate, endDate, description, accessType, teams, users, githubRepo } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, "ems47524752"); // Use the same secret key used in login
    } catch (err) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    const newProject = await Project.create({
      title,
      owner,
      startDate,
      endDate,
      description,
      accessType,
      teams,
      users,
      githubRepo,
    });

    res.status(200).json({ success: true, project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ startDate: 1 });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update a project
exports.updateProjectById = async (req, res) => {
  try {
    const { title, owner, startDate, endDate, description, accessType, teams, users, githubRepo } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
      title,
      owner,
      startDate,
      endDate,
      description,
      accessType,
      teams,
      users,
      githubRepo,
    }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, project: updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete a project
exports.deleteProjectById = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
