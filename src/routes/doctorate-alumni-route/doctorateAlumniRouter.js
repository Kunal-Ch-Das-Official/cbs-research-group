/**
 * Doctorate Alumni Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This router handles all routes related to doctorate alumni within the
 * CBS Research Group. It defines the endpoints for managing doctorate alumni
 * data, including CRUD operations such as creating, reading, updating, and
 * deleting alumni records.
 *
 * Usage:
 * Use this router to manage routes for interacting with doctorate alumni
 * data. It ensures that requests related to doctorate alumni are properly
 * processed and routed to the appropriate handlers or services.
 */

const express = require("express");
const uploadDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/uploadDoctorateAlumniCtrl");
const updateDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/updateDoctorateAlumniCtrl");
const getDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/getDoctorateAlumniCtrl");
const deleteDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/deleteDoctorateAlumniCtrl");
const multerLocalFileUploader = require("../../middlewares/multer-localfile-uploader/multerLocalFileUploader");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

// Use Express As Router //
const doctorateAlumniRouter = express.Router();

// Declaration Of Upload Route Segment:
doctorateAlumniRouter.post(
  "/alumni-data",
  checkAdminAuth,
  multerLocalFileUploader.single("profilePicture"),
  uploadDoctorateAlumniCtrl
);

// Declaration Of Update Route Segment:
doctorateAlumniRouter.patch(
  "/alumni-data/:id",
  checkAdminAuth,
  multerLocalFileUploader.single("profilePicture"),
  updateDoctorateAlumniCtrl
);

// Declaration Of Get All Data Route Segment:
doctorateAlumniRouter.get(
  "/alumni-data",
  cacheMiddleware,
  getDoctorateAlumniCtrl
);

// Declaration Of Get Single Data Route Segment:
doctorateAlumniRouter.get(
  "/alumni-data/:id",
  cacheMiddleware,
  getDoctorateAlumniCtrl
);

// Declaration Of Delete Route Segment:
doctorateAlumniRouter.delete(
  "/alumni-data/:id",
  checkAdminAuth,
  deleteDoctorateAlumniCtrl
);

module.exports = doctorateAlumniRouter;
