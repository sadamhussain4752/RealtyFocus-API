const express = require('express');
const router = express.Router();
const micrositeDetailController = require('../../controllers/AddmicrositedetailController/MicrositedetailController');

// Get all microsite details
router.get('/', micrositeDetailController.getAllMicrositeDetails);

// Get microsite detail by ID
router.get('/:id', micrositeDetailController.getMicrositeDetailById);

// Create a new microsite detail
router.post('/', micrositeDetailController.createMicrositeDetail);

// Update microsite detail by ID
router.put('/:id', micrositeDetailController.updateMicrositeDetail);

// Delete microsite detail by ID
router.delete('/:id', micrositeDetailController.deleteMicrositeDetail);

module.exports = router;
