// routes/amenitiesRoutes.js
const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  getAllAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require("../../controllers/AddAmenities/amenitiesController");

// Multer memory storage for file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllAmenities);
router.post("/", upload.single("image"), createAmenity);
router.put("/:id", upload.single("image"), updateAmenity);
router.delete("/:id", deleteAmenity);

module.exports = router;
