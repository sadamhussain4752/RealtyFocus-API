const express = require('express');
const router = express.Router();
const micrositeRatingController = require('../../controllers/AddMicrositeRating/AddMicrositeRatingController');

// Get all microsite ratings
router.get('/', micrositeRatingController.getAllMicrositeRatings);

// Get microsite rating by ID
router.get('/:id', micrositeRatingController.getMicrositeRatingById);

// Create a new microsite rating
router.post('/', micrositeRatingController.createMicrositeRating);

// Update microsite rating by ID
router.put('/:id', micrositeRatingController.updateMicrositeRating);

// Delete microsite rating by ID
router.delete('/:id', micrositeRatingController.deleteMicrositeRating);

module.exports = router;
