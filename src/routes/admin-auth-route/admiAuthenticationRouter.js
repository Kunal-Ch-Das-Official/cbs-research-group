// Content: Admin Registration  Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: This is the router file for handle the admin sign up.

const express = require("express");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const registerAsAdminCtrl = require("../../controller/admin-auth-controllers/registerAsAdminCtrl");
const changeAuthAdminPasswordCtrl = require("../../controller/admin-auth-controllers/changeAuthAdminPasswrdCtrl");
const getCurrentLoggedInAdminUserCtrl = require("../../controller/admin-auth-controllers/currentLoggedInAdminUserCtrl");
const loginAsAdminCtrl = require("../../controller/admin-auth-controllers/loginAsAdminCtrl");
const sendResetPasswordEmailCtrl = require("../../controller/admin-auth-controllers/sendResetPaswordEmailCtrl");
const resetForgottenPassword = require("../../controller/admin-auth-controllers/resetAuthAdminForgottenPasswrdCtrl");

const admiAuthenticationRouter = express.Router();

// Auth middleware register
admiAuthenticationRouter.use("/change-password", checkAdminAuth);
admiAuthenticationRouter.use("/logged-in-admin", checkAdminAuth);
// Protected Routes
admiAuthenticationRouter.post("/register", registerAsAdminCtrl);
admiAuthenticationRouter.post("/change-password", changeAuthAdminPasswordCtrl);
admiAuthenticationRouter.get(
  "/logged-in-admin",
  getCurrentLoggedInAdminUserCtrl
);

// Public Routes
admiAuthenticationRouter.post("/login", loginAsAdminCtrl);

admiAuthenticationRouter.post(
  "/send-reset-password-link",
  sendResetPasswordEmailCtrl
);
admiAuthenticationRouter.post(
  "/reset-password/:id/:token",
  resetForgottenPassword
);

module.exports = admiAuthenticationRouter;
