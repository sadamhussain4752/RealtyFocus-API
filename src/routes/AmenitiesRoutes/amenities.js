// routes/amenitiesRoutes.js
const express = require("express");
const { uploadHandler } = require("../../Image/multerSetup");
const router = express.Router();


const {
  getAllAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require("../../controllers/AddAmenities/amenitiesController");

// Multer memory storage for file uploads
router.get("/", getAllAmenities);
router.post("/", uploadHandler, createAmenity);
router.put("/:id", uploadHandler, updateAmenity);
router.delete("/:id", deleteAmenity);

module.exports = router;
