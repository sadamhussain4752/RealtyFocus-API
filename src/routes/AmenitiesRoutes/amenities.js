// routes/amenities.js
const express = require('express');
const router = express.Router();
const {
  getAllAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require('../../controllers/AddAmenities/amenitiesController');

router.get('/', getAllAmenities);         // GET all amenities
router.post('/', createAmenity);          // CREATE a new amenity
router.put('/:id', updateAmenity);        // UPDATE an amenity by ID
router.delete('/:id', deleteAmenity);     // DELETE an amenity by ID

module.exports = router;
