const express = require('express');
const router = express.Router();
const { uploadHandler } = require("../../Image/multerSetup");
const LegalapprovalControllers = require('../../controllers/AddLegalApproval/LegalApprovalController');

// ➤ Get All Legal Approvals (READ)
router.get('/', LegalapprovalControllers.getAllLegalApprovals);

// ➤ Create a New Legal Approval (CREATE)
router.post('/', uploadHandler, LegalapprovalControllers.createLegalApproval);

// ➤ Update a Legal Approval (UPDATE)
router.put('/:id', uploadHandler, LegalapprovalControllers.updateLegalApproval);

// ➤ Delete a Legal Approval (DELETE)
router.delete('/:id', LegalapprovalControllers.deleteLegalApproval);

module.exports = router;
