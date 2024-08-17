// Content: Master Alumni Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: This is the router file for handle all routes of master alumni of cbs research groups.

const express = require("express");
const multerSingleUploader = require("../../middlewares/multer-single-file-handler/multerSingleFileHandler");
const uploadMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/uploadMastersAlumniCtrl");
const updateMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/updateMastersAlumniCtrl");
const getMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/getMastersAlumniCtrl");
const getSingleMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/getSingleMastersAlumniCtrl");
const deleteMastersAlumniCtrl = require("../../controller/alumni-controllers/masters-alumni-controller/deleteMastersAlumniCtrl");

// Use Express As Router //
const mastersAlumniRouter = express.Router();

// Declaration Of Upload Route Segment:
mastersAlumniRouter.post(
  "/alumni-data",
  multerSingleUploader.single("profilePicture"),
  uploadMastersAlumniCtrl
);

// Declaration Of Update Route Segment:
mastersAlumniRouter.patch(
  "/alumni-data/:id",
  multerSingleUploader.single("profilePicture"),
  updateMastersAlumniCtrl
);

// Declaration Of Get All Alumni Data Route Segment:
mastersAlumniRouter.get("/alumni-data", getMastersAlumniCtrl);

// Declaration Of Get Single Data Route Segment:
mastersAlumniRouter.get("/alumni-data/:id", getSingleMastersAlumniCtrl);

// Declaration Of Delete Route Segment:
mastersAlumniRouter.delete("/alumni-data/:id", deleteMastersAlumniCtrl);

module.exports = mastersAlumniRouter;
