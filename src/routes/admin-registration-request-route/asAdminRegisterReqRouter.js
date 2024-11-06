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

const express = require('express');
const postRegisterAsAdminRequestCtrl = require('../../controller/admin-registration-request-controller/postRegisterAsAdminRequestCtrl');
const sendAcceptedResponseOfAdminRequestUserCtrl = require('../../controller/admin-registration-request-controller/sendAcceptedResponseOfAdminReqCtrl');
const sendDeniedResponseOfAdminRequestUserCtrl = require('../../controller/admin-registration-request-controller/sendDeniedResponseOfAdminRequestUserCtrl');
const deleteAdminRegisterRequestMessage = require('../../controller/admin-registration-request-controller/deleteAdminRegisterRequestCtrl');
const getAdminRegisterRequestCtrl = require('../../controller/admin-registration-request-controller/getAdminRegisterRequestCtrl');
const checkAdminAuth = require('../../middlewares/auth-middleware/authAdminMiddleware');

const adminRegistrationReqRouter = express.Router();

adminRegistrationReqRouter.post('/admin', postRegisterAsAdminRequestCtrl); // Post desire to be admin form router

// Admin request accept email router
adminRegistrationReqRouter.post(
  '/admin-accept/:id',
  checkAdminAuth,
  sendAcceptedResponseOfAdminRequestUserCtrl
);

// Admin request rejected router
adminRegistrationReqRouter.post(
  '/admin-denied/:id',
  checkAdminAuth,
  sendDeniedResponseOfAdminRequestUserCtrl
);

// Delete request to be admin message router
adminRegistrationReqRouter.delete(
  '/admin/:id',
  checkAdminAuth,
  deleteAdminRegisterRequestMessage
);

// Get single desire to be admin request message router
adminRegistrationReqRouter.get(
  '/admin/:id',
  checkAdminAuth,
  getAdminRegisterRequestCtrl
);

// Get all desire to be admin request message router
adminRegistrationReqRouter.get(
  '/admin',
  checkAdminAuth,
  getAdminRegisterRequestCtrl
);

module.exports = adminRegistrationReqRouter;
