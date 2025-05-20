const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/accessController");

router.get("/users", ctrl.getUsersWithPermissions);
router.get("/users/:id", ctrl.getUserPermissions);
router.post("/update", ctrl.updatePermissions);

module.exports = router;
