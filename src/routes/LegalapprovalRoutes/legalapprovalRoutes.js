const express = require('express');
const router = express.Router();
const LegalapprovalController = require('../../controllers/AddLegalApproval/LegalApprovalController');

// ➤ Get All Legal Approvals (READ)
router.get('/', LegalapprovalController.getAllLegalApprovals);

// ➤ Create a New Legal Approval (CREATE)
router.post('/', LegalapprovalController.createLegalApproval);

// ➤ Update a Legal Approval (UPDATE)
router.put('/:id', LegalapprovalController.updateLegalApproval);

// ➤ Delete a Legal Approval (DELETE)
router.delete('/:id', LegalapprovalController.deleteLegalApproval);

module.exports = router;
