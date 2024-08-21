// Content: Client Authentication Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: This is the router file for handle the client authentications

const express = require("express");
const {
  registerAuthMember,
} = require("../../../controller/authentication-controllers/client-auth-controllers/registerAuthMemberCtrl");
const {
  memberLogin,
} = require("../../../controller/authentication-controllers/client-auth-controllers/loginAuthMemberCtrl");
const {
  changePassword,
} = require("../../../controller/authentication-controllers/client-auth-controllers/changeAuthMemberPasswrdCtrl");
const checkMemberAuth = require("../../../middlewares/auth-middleware/authMemberMiddleware");
const {
  currentLoggedinMember,
} = require("../../../controller/authentication-controllers/client-auth-controllers/currentLoggedInMemberCtrl");
const {
  resetPassword,
} = require("../../../controller/authentication-controllers/client-auth-controllers/sendMemberResetPasswordLinkCtrl");
const {
  resetForgottenPassword,
} = require("../../../controller/authentication-controllers/client-auth-controllers/resetAuthMemberForgottenPaswrdCtrl");

const authMemberRouter = express.Router();

// Authentication Check Middleware.
authMemberRouter.use("/change-password", checkMemberAuth);
authMemberRouter.use("/logged-in-member", checkMemberAuth);

// Protected Routes
authMemberRouter.post("/change-password", changePassword);
authMemberRouter.get("/logged-in-member", currentLoggedinMember);

// Public Routes
authMemberRouter.post("/send-reset-password-link", resetPassword);
authMemberRouter.post("/reset-password/:id/:token", resetForgottenPassword);
authMemberRouter.post("/register", registerAuthMember);
authMemberRouter.post("/login", memberLogin);

module.exports = authMemberRouter;
