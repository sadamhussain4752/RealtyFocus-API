// routes/Specifications.js
const express = require('express');
const router = express.Router();
const {
    getAllDetailSpecifications,
    createDetailSpecifications,
    updateDetailSpecifications,
    deleteDetailSpecifications,
} = require('../../controllers/AddSpecifications/SpecificationsController');

router.get('/', getAllDetailSpecifications);         // GET all Specifications
router.post('/', createDetailSpecifications);          // CREATE a new Specifications
router.put('/:id', updateDetailSpecifications);        // UPDATE an Specifications by ID
router.delete('/:id', deleteDetailSpecifications);

module.exports = router;
