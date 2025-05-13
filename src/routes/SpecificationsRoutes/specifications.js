// routes/Specifications.js
const express = require('express');
const router = express.Router();
const {
  getAllSpecifications,
  createSpecifications,
  updateSpecifications,
  deleteSpecifications,
} = require('../../controllers/AddSpecifications/SpecificationsController');

router.get('/', getAllSpecifications);         // GET all Specifications
router.post('/', createSpecifications);          // CREATE a new Specifications
router.put('/:id', updateSpecifications);        // UPDATE an Specifications by ID
router.delete('/:id', deleteSpecifications);     // DELETE an Specifications by ID

module.exports = router;
