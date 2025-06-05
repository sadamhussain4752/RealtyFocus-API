const express = require('express');
const router = express.Router();
const { uploadHandler } = require("../../Image/multerSetup");
const floorPlanController = require('../../controllers/AddFloorPlanController/floorPlanController');

// ➤ Floor Plan Routes
router.get('/', floorPlanController.getAllFloorPlans);          // Get all floor plans
router.get('/:id', floorPlanController.getFloorPlanById);      // Get floor plan by ID
router.post('/', uploadHandler, floorPlanController.createFloorPlan);          // Create a new floor plan
router.put('/:id', uploadHandler, floorPlanController.updateFloorPlan);       // Update a floor plan
router.delete('/:id', floorPlanController.deleteFloorPlan);    // Delete a floor plan

module.exports = router;
