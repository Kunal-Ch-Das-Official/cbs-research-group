/**
 * PhD Members Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This router manages all routes related to PhD members for the
 * CBS Research Group. It defines endpoints for handling PhD member
 * data, including operations such as creating, reading, updating, and
 * deleting member records.
 *
 * Usage:
 * Use this router to manage routes for interacting with PhD members'
 * data. It ensures that requests related to PhD members are properly
 * processed and routed to the appropriate handlers or services.
 */

const express = require("express");
const uploadPhdMemberCtrl = require("../../controller/member-controllers/phd-members-controller/uploadPhdMemberCtrl");
const updatePhdMemberCtrl = require("../../controller/member-controllers/phd-members-controller/updatePhdMemberCtrl");
const getPhdMembersCtrl = require("../../controller/member-controllers/phd-members-controller/getPhdMembersCtrl");
const deletePhdMemberCtrl = require("../../controller/member-controllers/phd-members-controller/deletePhdMemberCtrl");
const multerLocalFileUploader = require("../../middlewares/multer-localfile-uploader/multerLocalFileUploader");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

const phdMembersRouter = express.Router();

// Declaration Of Upload Route Segment:
phdMembersRouter.post(
  "/members",
  checkAdminAuth,
  multerLocalFileUploader.single("profilePicture"),
  uploadPhdMemberCtrl
);

// Declaration Of Update Route Segment:
phdMembersRouter.patch(
  "/members/:id",
  checkAdminAuth,
  multerLocalFileUploader.single("profilePicture"),
  updatePhdMemberCtrl
);

// Declaration Of Get All Route Segment:
phdMembersRouter.get("/members", cacheMiddleware, getPhdMembersCtrl);

// Declaration Of Get Single Route Segment:
phdMembersRouter.get("/members/:id", cacheMiddleware, getPhdMembersCtrl);

// Declaration Of Delete Route Segment:
phdMembersRouter.delete("/members/:id", checkAdminAuth, deletePhdMemberCtrl);

module.exports = phdMembersRouter;
