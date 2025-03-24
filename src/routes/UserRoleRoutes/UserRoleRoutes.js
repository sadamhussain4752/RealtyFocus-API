const express = require("express");
const router = express.Router();
const userAdminController = require("../../controllers/AddUserController/UserRoleController");

// User authentication routes
router.post("/register", userAdminController.registerUser);
router.post("/login", userAdminController.login);
router.post("/verify", userAdminController.verifyUser);
router.post("/forgot-password", userAdminController.forgotPassword);

// User management routes
router.get("/users", userAdminController.getAllUsers);
router.get("/users/:id", userAdminController.getUserById);
router.put("/users/:id", userAdminController.updateUser);
router.delete("/users/:id", userAdminController.deleteUser);

module.exports = router;
