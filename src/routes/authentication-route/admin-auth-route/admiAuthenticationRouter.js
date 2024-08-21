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

const {
  currentLogginUser,
} = require("../../../controller/authentication-controllers/admin-auth-controllers/currentLoggedInAdminUserCtrl");
const {
  sendResetPasswordLink,
} = require("../../../controller/authentication-controllers/admin-auth-controllers/sendResetPaswordEmailCtrl");
const resetForgottenPassword = require("../../../controller/authentication-controllers/admin-auth-controllers/resetAuthAdminForgottenPasswrdCtrl");
const checkAdminAuth = require("../../../middlewares/auth-middleware/authAdminMiddleware");

const admiAuthenticationRouter = express.Router();

// Auth middleware register
admiAuthenticationRouter.use("/change-password", checkAdminAuth);
admiAuthenticationRouter.use("/logged-in-admin", checkAdminAuth);
// Protected Routes
admiAuthenticationRouter.post("/register", adminRegistration);
admiAuthenticationRouter.post("/change-password", changePassword);
admiAuthenticationRouter.get("/logged-in-admin", currentLogginUser);

// Public Routes
admiAuthenticationRouter.post("/login", adminLogin);

admiAuthenticationRouter.post(
  "/send-reset-password-link",
  sendResetPasswordLink
);
admiAuthenticationRouter.post(
  "/reset-password/:id/:token",
  resetForgottenPassword
);

module.exports = admiAuthenticationRouter;
