// imageDataRoutes.js
const express = require('express');
const router = express.Router();
const imageDataController = require('../../controllers/AddImageDataController/ImageDataController');

// ➤ Get all images
router.get('/', imageDataController.getAllImages);

// ➤ Get a single image by ID
router.get('/:id', imageDataController.getImageById);

// ➤ Create a new image
router.post('/', imageDataController.createImage);

// ➤ Update an image by ID
router.put('/:id', imageDataController.updateImage);

// ➤ Delete an image by ID
router.delete('/:id', imageDataController.deleteImage);

module.exports = router;
