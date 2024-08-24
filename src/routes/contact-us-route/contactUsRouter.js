// Content: Contact Form Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: This is the router file for handle contact form of cbs research groups.

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

// Declaration Of Upload Route Segment:
contactFormRouter.post("/information", uploadContactInfoCtrl);

// Declaration Of Send Resopnse To Contact User Route Segment:
contactFormRouter.post(
  "/response-mail/:id",
  checkAdminAuth,
  sendContactPersonResponseCtrl
);

// Declaration Of Get All Route Segment:
contactFormRouter.get(
  "/information",
  checkAdminAuth,
  cacheMiddleware,
  getContactInfoCtrl
);

// Declaration Of Get Single Route Segment:
contactFormRouter.get(
  "/information/:id",
  checkAdminAuth,
  cacheMiddleware,
  getContactInfoCtrl
);

// Declaration Of Delete Route Segment:
contactFormRouter.delete(
  "/information/:id",
  checkAdminAuth,
  deleteContactInfoCtrl
);

module.exports = contactFormRouter;
