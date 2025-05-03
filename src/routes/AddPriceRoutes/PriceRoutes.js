const express = require('express');
const router = express.Router();
const priceController = require('../../controllers/AddPriceController/AddPriceController');

// Get all prices
router.get('/', priceController.getAllPrices);

// Get price by ID
router.get('/:id', priceController.getPriceById);

// Create a new price entry
router.post('/', priceController.createPrice);

// Update price by ID
router.put('/:id', priceController.updatePrice);

// Delete price by ID
router.delete('/:id', priceController.deletePrice);

module.exports = router;
