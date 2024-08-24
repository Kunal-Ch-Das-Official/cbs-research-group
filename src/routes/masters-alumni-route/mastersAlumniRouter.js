/**
 * Master Alumni Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 15/08/2024
 *
 * Description:
 * This router manages all routes related to master's alumni for the
 * CBS Research Group. It defines endpoints for handling master alumni
 * data, including operations such as creating, reading, updating, and
 * deleting alumni records.
 *
 * Usage:
 * Use this router to manage routes for interacting with master's alumni
 * data. It ensures that requests related to master alumni are properly
 * processed and routed to the appropriate handlers or services.
 */

const express = require("express");
const uploadMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/uploadMastersAlumniCtrl");
const updateMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/updateMastersAlumniCtrl");
const getMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/getMastersAlumniCtrl");
const deleteMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/deleteMastersAlumniCtrl");
const multerLocalFileUploader = require("../../middlewares/multer-localfile-uploader/multerLocalFileUploader");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

// Use Express As Router //
const mastersAlumniRouter = express.Router();

// Declaration Of Upload Route Segment:
mastersAlumniRouter.post(
  "/alumni-data",
  checkAdminAuth,
  multerLocalFileUploader.single("profilePicture"),
  uploadMastersAlumniCtrl
);

// Declaration Of Update Route Segment:
mastersAlumniRouter.patch(
  "/alumni-data/:id",
  checkAdminAuth,
  multerLocalFileUploader.single("profilePicture"),
  updateMastersAlumniCtrl
);

// Declaration Of Get All Alumni Data Route Segment:
mastersAlumniRouter.get("/alumni-data", cacheMiddleware, getMastersAlumniCtrl);

// Declaration Of Get Single Data Route Segment:
mastersAlumniRouter.get(
  "/alumni-data/:id",
  cacheMiddleware,
  getMastersAlumniCtrl
);

// Declaration Of Delete Route Segment:
mastersAlumniRouter.delete(
  "/alumni-data/:id",
  checkAdminAuth,
  deleteMastersAlumniCtrl
);

module.exports = mastersAlumniRouter;
