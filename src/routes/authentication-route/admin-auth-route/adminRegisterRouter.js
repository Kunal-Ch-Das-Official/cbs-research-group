// Content: Admin Registration  Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: This is the router file for handle the admin sign up.

const express = require("express");
const registerAsAdminCtrl = require("../../../controller/authentication-controllers/admin-auth-controllers/registerAsAdminCtrl");
const loginAsAdminCtrl = require("../../../controller/authentication-controllers/admin-auth-controllers/loginAsAdminCtrl");

const adminRegistrationRouter = express.Router();
// Protected Routes
adminRegistrationRouter.post(
  "/register",
  registerAsAdminCtrl.adminRegistration
);

// Public Routes
adminRegistrationRouter.post("/login", loginAsAdminCtrl.adminLogin);

module.exports = adminRegistrationRouter;
