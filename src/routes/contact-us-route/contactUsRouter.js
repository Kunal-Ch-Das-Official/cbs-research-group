// Content: Contact Form Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: This is the router file for handle contact form of cbs research groups.

const express = require("express");
const uploadContactInfoCtrl = require("../../controller/contact-form-controllers/uploadContactInfoCtrl");
const deleteContactInfoCtrl = require("../../controller/contact-form-controllers/deleteContactInfoCtrl");
const getContactInfoCtrl = require("../../controller/contact-form-controllers/getContactInfoCtrl");

const contactFormRouter = express.Router();

// Declaration Of Upload Route Segment:
contactFormRouter.post("/information", uploadContactInfoCtrl);

// Declaration Of Get All Route Segment:
contactFormRouter.get("/information", getContactInfoCtrl);

// Declaration Of Get Single Route Segment:
contactFormRouter.get("/information/:id", getContactInfoCtrl);

// Declaration Of Delete Route Segment:
contactFormRouter.delete("/information/:id", deleteContactInfoCtrl);

module.exports = contactFormRouter;
