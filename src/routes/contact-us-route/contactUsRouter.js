/**
 * Contact Form Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This router manages the endpoints for handling contact form submissions
 * for the CBS Research Group. It processes incoming contact form data,
 * including user inquiries, and routes them to the appropriate handlers
 * or services for further action.
 *
 * Usage:
 * Use this router to manage routes associated with contact form submissions.
 * It ensures that contact data is processed and forwarded correctly, facilitating
 * effective communication with users.
 */

const express = require("express");
const uploadContactInfoCtrl = require("../../controller/contact-form-controllers/uploadContactInfoCtrl");
const deleteContactInfoCtrl = require("../../controller/contact-form-controllers/deleteContactInfoCtrl");
const getContactInfoCtrl = require("../../controller/contact-form-controllers/getContactInfoCtrl");
const sendContactPersonResponseCtrl = require("../../controller/contact-form-controllers/sendContactPersonResponseCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

const contactFormRouter = express.Router();

// Post contact form router
contactFormRouter.post("/information", uploadContactInfoCtrl);

// Send coresponding email response of contact query router
contactFormRouter.post(
  "/response-mail/:id",
  checkAdminAuth,
  sendContactPersonResponseCtrl
);

// Get all contact information router
contactFormRouter.get(
  "/information",
  checkAdminAuth,
  cacheMiddleware,
  getContactInfoCtrl
);

// Get single contact information router
contactFormRouter.get(
  "/information/:id",
  checkAdminAuth,
  cacheMiddleware,
  getContactInfoCtrl
);

// Delete specific contact message router
contactFormRouter.delete(
  "/information/:id",
  checkAdminAuth,
  deleteContactInfoCtrl
);

module.exports = contactFormRouter;
