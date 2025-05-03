const express = require('express');
const router = express.Router();
const builderController = require('../../controllers/AddBuilderController/builderController');

// ➤ Builder Routes
router.get('/', builderController.getAllBuilders);           // Get all builders
router.get('/:id', builderController.getBuilderById);       // Get builder by ID
router.post('/', builderController.createBuilder);           // Create new builder
router.put('/:id', builderController.updateBuilder);        // Update builder by ID
router.delete('/:id', builderController.deleteBuilder);     // Delete builder by ID

module.exports = router;
