const express = require('express');
const router = express.Router();
const PropTypeControllers = require('../../controllers/AddPropType/AllProptypeController');

// ➤ Get All Legal Approvals (READ)
router.get('/', PropTypeControllers.getAllProptypes);

// ➤ Create a New Legal Approval (CREATE)
router.post('/', PropTypeControllers.createProptype);

// ➤ Update a Legal Approval (UPDATE)
router.put('/:id', PropTypeControllers.updateProptype);

// ➤ Delete a Legal Approval (DELETE)
router.delete('/:id', PropTypeControllers.deleteProptype);

module.exports = router;
