// metaRoutes.js
const express = require('express');
const router = express.Router();
const metaController = require('../../controllers/AddMetaController/MetaController');

// ➤ Get all meta entries
router.get('/', metaController.getAllMeta);

// ➤ Get a single meta entry by ID
router.get('/:id', metaController.getMetaById);

// ➤ Create a new meta entry
router.post('/', metaController.createMeta);

// ➤ Update an existing meta entry by ID
router.put('/:id', metaController.updateMeta);

// ➤ Delete a meta entry by ID
router.delete('/:id', metaController.deleteMeta);

module.exports = router;
