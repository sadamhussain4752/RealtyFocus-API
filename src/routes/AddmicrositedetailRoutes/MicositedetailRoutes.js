const express = require('express');
const router = express.Router();
const { uploadHandler } = require("../../Image/multerSetup");
const micrositeDetailController = require('../../controllers/AddmicrositedetailController/MicrositedetailController');

// Get all microsite details
router.get('/', micrositeDetailController.getAllMicrositeDetails);

// Get microsite detail by ID
router.get('/:id', micrositeDetailController.getMicrositeDetailById);

// Create a new microsite detail
router.post('/', uploadHandler, micrositeDetailController.createMicrositeDetail);

// Update microsite detail by ID
router.put('/:id', uploadHandler, micrositeDetailController.updateMicrositeDetail);

// Delete microsite detail by ID
router.delete('/:id', micrositeDetailController.deleteMicrositeDetail);

module.exports = router;
