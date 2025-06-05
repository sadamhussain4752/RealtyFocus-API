const express = require('express');
const router = express.Router();
const { uploadHandler } = require("../../Image/multerSetup");
const LegalapprovalController = require('../../controllers/AddLegalApproval/LegalApprovalController');

// ➤ Get All Legal Approvals (READ)
router.get('/', LegalapprovalController.getAllLegalApprovals);

// ➤ Create a New Legal Approval (CREATE)
router.post('/', uploadHandler, LegalapprovalController.createLegalApproval);

// ➤ Update a Legal Approval (UPDATE)
router.put('/:id', uploadHandler, LegalapprovalController.updateLegalApproval);

// ➤ Delete a Legal Approval (DELETE)
router.delete('/:id', LegalapprovalController.deleteLegalApproval);

module.exports = router;
