// Content: MSC Members Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: This is the router file for handle all routes of msc members of cbs research groups.

const express = require("express");
const uploadMscMemberCtrl = require("../../controller/member-controllers/msc-members-controller/uploadMscMemberCtrl");
const updateMscMemberCtrl = require("../../controller/member-controllers/msc-members-controller/updateMscMemberCtrl");
const getMscMembersCtrl = require("../../controller/member-controllers/msc-members-controller/getMscMembersCtrl");
const deleteMscMemberCtrl = require("../../controller/member-controllers/msc-members-controller/deleteMscMemberCtrl");
const multerLocalFileUploader = require("../../middlewares/multer-localfile-uploader/multerLocalFileUploader");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");

const mscMembersRouter = express.Router();

// Declaration Of Upload Route Segment:
mscMembersRouter.post(
  "/members",
  checkAdminAuth,
  multerLocalFileUploader.single("profilePicture"),
  uploadMscMemberCtrl
);
// Declaration Of Update Route Segment:
mscMembersRouter.patch(
  "/members/:id",
  checkAdminAuth,
  multerLocalFileUploader.single("profilePicture"),
  updateMscMemberCtrl
);

// Declaration Of Get All Route Segment:
mscMembersRouter.get("/members", getMscMembersCtrl);

// Declaration Of Get Single Route Segment:
mscMembersRouter.get("/members/:id", getMscMembersCtrl);

// Declaration Of Delete Route Segment:
mscMembersRouter.delete("/members/:id", checkAdminAuth, deleteMscMemberCtrl);

module.exports = mscMembersRouter;
