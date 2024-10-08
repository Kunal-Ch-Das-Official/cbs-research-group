/**
 * Lab Instruments Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 * Last update: 08/10/2024
 * Description:
 * This router manages all routes related to lab instruments for the
 * CBS Research Group. It defines endpoints for handling lab instrument
 * data, including operations such as creating, reading, updating, and
 * deleting instrument records.
 *
 * Usage:
 * Use this router to manage routes for interacting with lab instruments
 * data. It ensures that requests related to lab instruments are properly
 * processed and routed to the appropriate handlers or services.
 */

const express = require('express');
const uploadLabInstrumentCtrl = require('../../controller/lab-instruments-controllers/uploadLabInstrumentCtrl');
const updateLabInstrumentCtrl = require('../../controller/lab-instruments-controllers/updateLabInstrumentCtrl');
const deleteLabInstrumentCtrl = require('../../controller/lab-instruments-controllers/deleteLabInstrumentCtrl');
const {
  getLabInstrumentsCtrl,
} = require('../../controller/lab-instruments-controllers/getLabInstrumentsCtrl');
const multerLocalFileUploader = require('../../middlewares/multer-localfile-uploader/multerLocalFileUploader');
const checkAdminAuth = require('../../middlewares/auth-middleware/authAdminMiddleware');

const labInstrumentsRouter = express.Router();

// Post lab instrument router
labInstrumentsRouter.post(
  '/lab-instruments',
  checkAdminAuth,
  multerLocalFileUploader.single('instrumentImage'),
  uploadLabInstrumentCtrl
);

// Update lab instrument router
labInstrumentsRouter.patch(
  '/lab-instruments/:id',
  checkAdminAuth,
  multerLocalFileUploader.single('instrumentImage'),
  updateLabInstrumentCtrl
);

// Get all lab instrument router
labInstrumentsRouter.get('/lab-instruments', getLabInstrumentsCtrl);

// Get single lab instrument router
labInstrumentsRouter.get('/lab-instruments/:id', getLabInstrumentsCtrl);

// Delete specific lab instrument router
labInstrumentsRouter.delete(
  '/lab-instruments/:id',
  checkAdminAuth,
  deleteLabInstrumentCtrl
);

module.exports = labInstrumentsRouter;
