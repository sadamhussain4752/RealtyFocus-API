// routes/micrositeRoutes.js
const express = require('express');
const router = express.Router();
const micrositeController = require('../../controllers/AddmicrositeController/MicrositeController');

// ➤ Get all microsites (with optional query filtering)
router.get('/', micrositeController.getAllMicrosites);

// ➤ Get a microsite by Name
router.get('/:name', micrositeController.getMicrositeByName);

// ➤ Get a microsite by ID
//router.get('/:id', micrositeController.getMicrositeById);

// ➤ Filter microsites by ID (if needed)
router.post('/filter', micrositeController.getAllMicrositesByID);

// ➤ Create a new microsite
router.post('/', micrositeController.createMicrosite);

// ➤ Update a microsite by ID
router.put('/:id', micrositeController.updateMicrosite);

// ➤ Delete a microsite by ID
router.delete('/:id', micrositeController.deleteMicrosite);

module.exports = router;
