// Content: Admin Registration  Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: This is the router file for handle the admin sign up.

const express = require("express");
const {
  adminRegistration,
} = require("../../../controller/authentication-controllers/admin-auth-controllers/registerAsAdminCtrl");
const {
  adminLogin,
} = require("../../../controller/authentication-controllers/admin-auth-controllers/loginAsAdminCtrl");
const {
  changePassword,
} = require("../../../controller/authentication-controllers/admin-auth-controllers/changeAuthAdminPasswrdCtrl");
const checkAdminAuth = require("../../../middlewares/auth-middleware/authMiddleware");
const {
  currentLogginUser,
} = require("../../../controller/authentication-controllers/admin-auth-controllers/currentLoggedInAdminUserCtrl");

const adminRegistrationRouter = express.Router();

// Auth middleware register
adminRegistrationRouter.use("/change-password", checkAdminAuth);
adminRegistrationRouter.use("/logged-in-admin", checkAdminAuth);
// Protected Routes
adminRegistrationRouter.post("/register", adminRegistration);
adminRegistrationRouter.post("/change-password", changePassword);
adminRegistrationRouter.get("/logged-in-admin", currentLogginUser);

// Public Routes
adminRegistrationRouter.post("/login", adminLogin);

module.exports = adminRegistrationRouter;
