/**
 * MSC Members Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 * Last update: 08/10/2024
 * Description:
 * This router manages all routes related to MSC members for the
 * CBS Research Group. It defines endpoints for handling MSC member
 * data, including operations such as creating, reading, updating, and
 * deleting member records.
 *
 * Usage:
 * Use this router to manage routes for interacting with MSC members'
 * data. It ensures that requests related to MSC members are properly
 * processed and routed to the appropriate handlers or services.
 */

const express = require('express');
const uploadMscMemberCtrl = require('../../controller/member-controllers/msc-members-controller/uploadMscMemberCtrl');
const updateMscMemberCtrl = require('../../controller/member-controllers/msc-members-controller/updateMscMemberCtrl');
const {
  getMscMembersCtrl,
} = require('../../controller/member-controllers/msc-members-controller/getMscMembersCtrl');
const deleteMscMemberCtrl = require('../../controller/member-controllers/msc-members-controller/deleteMscMemberCtrl');
const multerLocalFileUploader = require('../../middlewares/multer-localfile-uploader/multerLocalFileUploader');
const checkAdminAuth = require('../../middlewares/auth-middleware/authAdminMiddleware');

const mscMembersRouter = express.Router();

// Post new msc members information router
mscMembersRouter.post(
  '/members',
  checkAdminAuth,
  multerLocalFileUploader.single('profilePicture'),
  uploadMscMemberCtrl
);
//Update msc members information router
mscMembersRouter.patch(
  '/members/:id',
  checkAdminAuth,
  multerLocalFileUploader.single('profilePicture'),
  updateMscMemberCtrl
);

// Get all msc members information router
mscMembersRouter.get('/members', getMscMembersCtrl);

// Get single msc members information router
mscMembersRouter.get('/members/:id', getMscMembersCtrl);

// Delete specific msc members information router
mscMembersRouter.delete('/members/:id', checkAdminAuth, deleteMscMemberCtrl);

module.exports = mscMembersRouter;
