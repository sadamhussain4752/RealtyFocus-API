const express = require('express');
const router = express.Router();
const PropstatusController = require('../../controllers/AddPropstatus/PropstatusController');

// ➤ Get All Legal Approvals (READ)
router.get('/', PropstatusController.getAllPropstatuss);

// ➤ Create a New Legal Approval (CREATE)
router.post('/', PropstatusController.createPropstatus);

// ➤ Update a Legal Approval (UPDATE)
router.put('/:id', PropstatusController.updatePropstatus);

// ➤ Delete a Legal Approval (DELETE)
router.delete('/:id', PropstatusController.deletePropstatus);

module.exports = router;
