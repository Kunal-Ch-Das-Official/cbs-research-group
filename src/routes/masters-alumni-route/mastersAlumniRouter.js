// Content: Master Alumni Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: This is the router file for handle all routes of master alumni of cbs research groups.

const express = require("express");
const uploadMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/uploadMastersAlumniCtrl");
const updateMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/updateMastersAlumniCtrl");
const getMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/getMastersAlumniCtrl");
const deleteMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/deleteMastersAlumniCtrl");
const multerLocalFileUploader = require("../../middlewares/multer-localfile-uploader/multerLocalFileUploader");

// Use Express As Router //
const mastersAlumniRouter = express.Router();

// Declaration Of Upload Route Segment:
mastersAlumniRouter.post(
  "/alumni-data",
  multerLocalFileUploader.single("profilePicture"),
  uploadMastersAlumniCtrl
);

// Declaration Of Update Route Segment:
mastersAlumniRouter.patch(
  "/alumni-data/:id",
  multerLocalFileUploader.single("profilePicture"),
  updateMastersAlumniCtrl
);

// Declaration Of Get All Alumni Data Route Segment:
mastersAlumniRouter.get("/alumni-data", getMastersAlumniCtrl);

// Declaration Of Get Single Data Route Segment:
mastersAlumniRouter.get("/alumni-data/:id", getMastersAlumniCtrl);

// Declaration Of Delete Route Segment:
mastersAlumniRouter.delete("/alumni-data/:id", deleteMastersAlumniCtrl);

module.exports = mastersAlumniRouter;
