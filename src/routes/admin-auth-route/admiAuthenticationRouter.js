/**
 * Admin Registration Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This router handles the admin sign-up process for the CBS Research Group.
 * It defines the endpoints and middleware for registering new admin users,
 * including validation of registration data and integration with the
 * admin user database model.
 *
 * Usage:
 * Use this router to manage admin registration routes. It handles requests
 * related to admin sign-up, ensuring proper validation and creation of new
 * admin user records in the database.
 */

const express = require("express");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const registerAsAdminCtrl = require("../../controller/admin-auth-controllers/registerAsAdminCtrl");
const changeAuthAdminPasswordCtrl = require("../../controller/admin-auth-controllers/changeAuthAdminPasswrdCtrl");
const getCurrentLoggedInAdminUserCtrl = require("../../controller/admin-auth-controllers/currentLoggedInAdminUserCtrl");
const loginAsAdminCtrl = require("../../controller/admin-auth-controllers/loginAsAdminCtrl");
const sendResetPasswordEmailCtrl = require("../../controller/admin-auth-controllers/sendResetPaswordEmailCtrl");
const resetForgottenPassword = require("../../controller/admin-auth-controllers/resetAuthAdminForgottenPasswrdCtrl");

const admiAuthenticationRouter = express.Router();

// Declaration of Auth middleware //
admiAuthenticationRouter.use("/change-password", checkAdminAuth); // Change password auth check
admiAuthenticationRouter.use("/logged-in-admin", checkAdminAuth); // logged in admin auth check
// Protected Routers//
admiAuthenticationRouter.post("/register", registerAsAdminCtrl); // Admin registration router
admiAuthenticationRouter.post("/change-password", changeAuthAdminPasswordCtrl); // Chandge password router

// Current Logged in admin router
admiAuthenticationRouter.get(
  "/logged-in-admin",
  getCurrentLoggedInAdminUserCtrl
);

// Public Routers //
admiAuthenticationRouter.post("/login", loginAsAdminCtrl); // Login as admin router

// Send forget password link router
admiAuthenticationRouter.post(
  "/send-reset-password-link",
  sendResetPasswordEmailCtrl
);

// Reset forgotten password router
admiAuthenticationRouter.post(
  "/reset-password/:id/:token",
  resetForgottenPassword
);

module.exports = admiAuthenticationRouter;
