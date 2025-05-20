// routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const { updateProfile } = require("../../controllers/ProfileController/profileController");

router.put("/:id", updateProfile); // No auth middleware

module.exports = router;
