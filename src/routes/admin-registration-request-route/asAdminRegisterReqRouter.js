// Content: Admin Registration Request Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: This is the router file for handle all request of admin register request to the authority of cbs research groups.

const express = require("express");
const postRegisterAsAdminRequestCtrl = require("../../controller/admin-registration-request-controller/postRegisterAsAdminRequestCtrl");
const sendAcceptedResponseOfAdminRequestUserCtrl = require("../../controller/admin-registration-request-controller/sendAcceptedResponseOfAdminReqCtrl");
const sendDeniedResponseOfAdminRequestUserCtrl = require("../../controller/admin-registration-request-controller/sendDeniedResponseOfAdminRequestUserCtrl");
const deleteAdminRegisterRequestMessage = require("../../controller/admin-registration-request-controller/deleteAdminRegisterRequestCtrl");
const getAdminRegisterRequestCtrl = require("../../controller/admin-registration-request-controller/getAdminRegisterRequestCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");

const adminRegistrationReqRouter = express.Router();

adminRegistrationReqRouter.post("/admin", postRegisterAsAdminRequestCtrl);

adminRegistrationReqRouter.post(
  "/admin-accept/:id",
  checkAdminAuth,
  sendAcceptedResponseOfAdminRequestUserCtrl
);

adminRegistrationReqRouter.post(
  "/admin-denied/:id",

  checkAdminAuth,
  sendDeniedResponseOfAdminRequestUserCtrl
);

adminRegistrationReqRouter.delete(
  "/admin/:id",
  checkAdminAuth,
  deleteAdminRegisterRequestMessage
);

adminRegistrationReqRouter.get(
  "/admin/:id",
  checkAdminAuth,
  getAdminRegisterRequestCtrl
);

adminRegistrationReqRouter.get(
  "/admin",
  checkAdminAuth,
  getAdminRegisterRequestCtrl
);

module.exports = adminRegistrationReqRouter;
