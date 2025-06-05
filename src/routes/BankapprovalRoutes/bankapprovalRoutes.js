const express = require('express');
const router = express.Router();
const { uploadHandler } = require("../../Image/multerSetup");
const bankapprovalController = require('../../controllers/AddBankApproval/BankApprovalController');

// ➤ Get All Bank Approvals (READ)
router.get('/', bankapprovalController.getAllBankApprovals);

// ➤ Create a New Bank Approval (CREATE)
router.post('/', uploadHandler, bankapprovalController.createBankApproval);

// ➤ Update a Bank Approval (UPDATE)
router.put('/:id', uploadHandler, bankapprovalController.updateBankApproval);

// ➤ Delete a Bank Approval (DELETE)
router.delete('/:id', bankapprovalController.deleteBankApproval);

module.exports = router;
