const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/AddadminController/adminController");

router.get("/admins", adminController.getAllAdmins);
router.post("/admins", adminController.addAdmin);
router.put("/admins/:id", adminController.updateAdmin);
router.delete("/admins/:id", adminController.deleteAdmin);

module.exports = router;
