// Content: Admin Registration  Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: This is the router file for handle the admin sign up.

const express = require("express");
const registerAsAdminCtrl = require("../../../controller/authentication-controllers/admin-auth-controllers/registerAsAdminCtrl");

const adminRegistrationRouter = express.Router();
// Public Routes
adminRegistrationRouter.post(
  "/register",
  registerAsAdminCtrl.adminRegistration
);

// Protected Routes

module.exports = adminRegistrationRouter;
