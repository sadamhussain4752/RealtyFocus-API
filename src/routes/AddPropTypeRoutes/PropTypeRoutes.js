const express = require('express');
const router = express.Router();
const PropTypeController = require('../../controllers/AddPropType/PropTypeController');

// ➤ Get All Legal Approvals (READ)
router.get('/', PropTypeController.getAllProptypes);

// ➤ Create a New Legal Approval (CREATE)
router.post('/', PropTypeController.createProptype);

// ➤ Update a Legal Approval (UPDATE)
router.put('/:id', PropTypeController.updateProptype);

// ➤ Delete a Legal Approval (DELETE)
router.delete('/:id', PropTypeController.deleteProptype);

module.exports = router;
