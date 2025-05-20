const express = require('express');
const router = express.Router();
const MicrositeMetaTagController = require('../../controllers/AddMicrositeMetaTag/MicrositeMetaTagController');

// ➤ Get All Legal Approvals (READ)
router.get('/', MicrositeMetaTagController.getAllMicrositeMetaTags);

// ➤ Create a New Legal Approval (CREATE)
router.post('/', MicrositeMetaTagController.createMicrositeMetaTag);

// ➤ Update a Legal Approval (UPDATE)
router.put('/:id', MicrositeMetaTagController.updateMicrositeMetaTag);

// ➤ Delete a Legal Approval (DELETE)
router.delete('/:id', MicrositeMetaTagController.deleteMicrositeMetaTag);

module.exports = router;
