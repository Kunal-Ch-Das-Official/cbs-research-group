// Content: Lab Instruments Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: This is the router file for handle all routes of all lab instrument of cbs research groups.

const express = require("express");
const multerSingleUploader = require("../../middlewares/multer-single-file-handler/multerSingleFileHandler");
const uploadLabInstrumentCtrl = require("../../controller/lab-instruments-controllers/uploadLabInstrumentCtrl");
const updateLabInstrumentCtrl = require("../../controller/lab-instruments-controllers/updateLabInstrumentCtrl");
const deleteLabInstrumentCtrl = require("../../controller/lab-instruments-controllers/deleteLabInstrumentCtrl");
const getLabInstrumentsCtrl = require("../../controller/lab-instruments-controllers/getLabInstrumentsCtrl");

const labInstrumentsRouter = express.Router();

// Declaration Of Upload Route Segment:
labInstrumentsRouter.post(
  "/lab-instruments",
  multerSingleUploader.single("instrumentImage"),
  uploadLabInstrumentCtrl
);

// Declaration Of Update Route Segment:
labInstrumentsRouter.patch(
  "/lab-instruments/:id",
  multerSingleUploader.single("instrumentImage"),
  updateLabInstrumentCtrl
);

// Declaration Of Get All Route Segment:
labInstrumentsRouter.get("/lab-instruments", getLabInstrumentsCtrl);

// Declaration Of Get Single Route Segment:
labInstrumentsRouter.get("/lab-instruments/:id", getLabInstrumentsCtrl);

// Declaration Of Delete Route Segment:
labInstrumentsRouter.delete("/lab-instruments/:id", deleteLabInstrumentCtrl);

module.exports = labInstrumentsRouter;
