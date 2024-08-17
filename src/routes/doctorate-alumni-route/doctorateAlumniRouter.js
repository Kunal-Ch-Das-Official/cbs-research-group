// Content: Doctorate Alumni Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: This is the router file for handle all routes of doctorate alumni of cbs research groups.

const express = require("express");
const multerSingleUploader = require("../../middlewares/multer-single-file-handler/multerSingleFileHandler");
const uploadDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/uploadDoctorateAlumniCtrl");
const updateDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/updateDoctorateAlumniCtrl");
const getDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/getDoctorateAlumniCtrl");
const getSingleDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/getSingleDoctorateAlumniCtrl");
const deleteDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/deleteDoctorateAlumniCtrl");

// Use Express As Router //
const doctorateAlumniRouter = express.Router();

// Declaration Of Upload Route Segment:
doctorateAlumniRouter.post(
  "/alumni-data",
  multerSingleUploader.single("profilePicture"),
  uploadDoctorateAlumniCtrl
);

// Declaration Of Update Route Segment:
doctorateAlumniRouter.patch(
  "/alumni-data/:id",
  multerSingleUploader.single("profilePicture"),
  updateDoctorateAlumniCtrl
);

// Declaration Of Get All Data Route Segment:
doctorateAlumniRouter.get("/alumni-data", getDoctorateAlumniCtrl);

// Declaration Of Get Single Data Route Segment:
doctorateAlumniRouter.get("/alumni-data/:id", getSingleDoctorateAlumniCtrl);

// Declaration Of Delete Route Segment:
doctorateAlumniRouter.delete("/alumni-data/:id", deleteDoctorateAlumniCtrl);

module.exports = doctorateAlumniRouter;
