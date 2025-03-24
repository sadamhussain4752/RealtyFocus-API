const express = require('express');
const router = express.Router();
const { uploadHandler } = require("../../Image/multerSetup");
const projectController = require('../../controllers/AddProjectController/ProjectController');

// Create a new project
router.post('/Addprojects', projectController.createProject);

// Get all projects
router.get('/projects', projectController.getAllProjects);

// Get a specific project by ID
router.get('/projects/:id', projectController.getProjectById);

// Update a specific project by ID
router.put('/projects/:id', uploadHandler, projectController.updateProjectById);

// Delete a specific project by ID
router.delete('/projects/:id', projectController.deleteProjectById);

module.exports = router;