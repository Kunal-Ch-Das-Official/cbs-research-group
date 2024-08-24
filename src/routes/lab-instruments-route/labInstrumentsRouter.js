// Content: Lab Instruments Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: This is the router file for handle all routes of all lab instrument of cbs research groups.

const express = require("express");
const uploadLabInstrumentCtrl = require("../../controller/lab-instruments-controllers/uploadLabInstrumentCtrl");
const updateLabInstrumentCtrl = require("../../controller/lab-instruments-controllers/updateLabInstrumentCtrl");
const deleteLabInstrumentCtrl = require("../../controller/lab-instruments-controllers/deleteLabInstrumentCtrl");
const getLabInstrumentsCtrl = require("../../controller/lab-instruments-controllers/getLabInstrumentsCtrl");
const multerLocalFileUploader = require("../../middlewares/multer-localfile-uploader/multerLocalFileUploader");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

const labInstrumentsRouter = express.Router();

// Declaration Of Upload Route Segment:
labInstrumentsRouter.post(
  "/lab-instruments",
  checkAdminAuth,
  multerLocalFileUploader.single("instrumentImage"),
  uploadLabInstrumentCtrl
);

// Declaration Of Update Route Segment:
labInstrumentsRouter.patch(
  "/lab-instruments/:id",
  checkAdminAuth,
  multerLocalFileUploader.single("instrumentImage"),
  updateLabInstrumentCtrl
);

// Declaration Of Get All Route Segment:
labInstrumentsRouter.get(
  "/lab-instruments",
  cacheMiddleware,
  getLabInstrumentsCtrl
);

// Declaration Of Get Single Route Segment:
labInstrumentsRouter.get(
  "/lab-instruments/:id",
  cacheMiddleware,
  getLabInstrumentsCtrl
);

// Declaration Of Delete Route Segment:
labInstrumentsRouter.delete(
  "/lab-instruments/:id",
  checkAdminAuth,
  deleteLabInstrumentCtrl
);

module.exports = labInstrumentsRouter;
