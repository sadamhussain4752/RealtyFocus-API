// routes/Specifications.js
const express = require('express');
const { uploadHandler } = require("../../Image/multerSetup");
const router = express.Router();
const {
  getAllSpecifications,
  createSpecifications,
  updateSpecifications,
  deleteSpecifications,
} = require('../../controllers/AddSpecifications/AllSpecificationsController');

router.get('/', getAllSpecifications);         // GET all Specifications
router.post('/', uploadHandler, createSpecifications);          // CREATE a new Specifications
router.put('/:id', uploadHandler, updateSpecifications);        // UPDATE an Specifications by ID
router.delete('/:id', deleteSpecifications);     // DELETE an Specifications by ID

module.exports = router;
