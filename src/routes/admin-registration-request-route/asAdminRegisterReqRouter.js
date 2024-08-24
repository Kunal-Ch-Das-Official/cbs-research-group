/**
 * Admin Registration Request Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This router handles all requests related to admin registration
 * within the CBS Research Group. It manages the endpoints for processing
 * admin registration requests, including validation and forwarding
 * requests to the appropriate authority for review and approval.
 *
 * Usage:
 * Use this router to manage routes associated with admin registration
 * requests. It ensures that registration requests are properly handled
 * and directed to the appropriate administrative authority for processing.
 */

const express = require("express");
const postRegisterAsAdminRequestCtrl = require("../../controller/admin-registration-request-controller/postRegisterAsAdminRequestCtrl");
const sendAcceptedResponseOfAdminRequestUserCtrl = require("../../controller/admin-registration-request-controller/sendAcceptedResponseOfAdminReqCtrl");
const sendDeniedResponseOfAdminRequestUserCtrl = require("../../controller/admin-registration-request-controller/sendDeniedResponseOfAdminRequestUserCtrl");
const deleteAdminRegisterRequestMessage = require("../../controller/admin-registration-request-controller/deleteAdminRegisterRequestCtrl");
const getAdminRegisterRequestCtrl = require("../../controller/admin-registration-request-controller/getAdminRegisterRequestCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

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
  cacheMiddleware,
  getAdminRegisterRequestCtrl
);

adminRegistrationReqRouter.get(
  "/admin",
  checkAdminAuth,
  cacheMiddleware,
  getAdminRegisterRequestCtrl
);

module.exports = adminRegistrationReqRouter;
