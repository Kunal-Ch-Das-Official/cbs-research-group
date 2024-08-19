// Content: MSC Members Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: This is the router file for handle all routes of msc members of cbs research groups.

const express = require("express");
const multerSingleUploader = require("../../middlewares/multer-single-file-handler/multerSingleFileHandler");
const uploadMscMemberCtrl = require("../../controller/member-controllers/msc-members-controller/uploadMscMemberCtrl");
const updateMscMemberCtrl = require("../../controller/member-controllers/msc-members-controller/updateMscMemberCtrl");
const getMscMembersCtrl = require("../../controller/member-controllers/msc-members-controller/getMscMembersCtrl");
const deleteMscMemberCtrl = require("../../controller/member-controllers/msc-members-controller/deleteMscMemberCtrl");

const mscMembersRouter = express.Router();

// Declaration Of Upload Route Segment:
mscMembersRouter.post(
  "/members",
  multerSingleUploader.single("profilePicture"),
  uploadMscMemberCtrl
);
// Declaration Of Update Route Segment:
mscMembersRouter.patch(
  "/members/:id",
  multerSingleUploader.single("profilePicture"),
  updateMscMemberCtrl
);

// Declaration Of Get All Route Segment:
mscMembersRouter.get("/members", getMscMembersCtrl);

// Declaration Of Get Single Route Segment:
mscMembersRouter.get("/members/:id", getMscMembersCtrl);

// Declaration Of Delete Route Segment:
mscMembersRouter.delete("/members/:id", deleteMscMemberCtrl);

module.exports = mscMembersRouter;
