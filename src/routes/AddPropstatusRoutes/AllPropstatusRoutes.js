const express = require('express');
const router = express.Router();
const PropstatusControllers = require('../../controllers/AddPropstatus/AllPropstatusController');

// ➤ Get All Legal Approvals (READ)
router.get('/', PropstatusControllers.getAllPropstatuss);

// ➤ Create a New Legal Approval (CREATE)
router.post('/', PropstatusControllers.createPropstatus);

// ➤ Update a Legal Approval (UPDATE)
router.put('/:id', PropstatusControllers.updatePropstatus);

// ➤ Delete a Legal Approval (DELETE)
router.delete('/:id', PropstatusControllers.deletePropstatus);

module.exports = router;
