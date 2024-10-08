/**
 * Doctorate Alumni Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 * Last update: 08/10/2024
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

const express = require('express');
const uploadDoctorateAlumniCtrl = require('../../controller/alumni-controllers/doctorate-alumni-controller/uploadDoctorateAlumniCtrl');
const updateDoctorateAlumniCtrl = require('../../controller/alumni-controllers/doctorate-alumni-controller/updateDoctorateAlumniCtrl');
const {
  getDoctorateAlumniCtrl,
} = require('../../controller/alumni-controllers/doctorate-alumni-controller/getDoctorateAlumniCtrl');
const deleteDoctorateAlumniCtrl = require('../../controller/alumni-controllers/doctorate-alumni-controller/deleteDoctorateAlumniCtrl');
const multerLocalFileUploader = require('../../middlewares/multer-localfile-uploader/multerLocalFileUploader');
const checkAdminAuth = require('../../middlewares/auth-middleware/authAdminMiddleware');

// Use Express As Router //
const doctorateAlumniRouter = express.Router();

// Post doctorate alumni info router
doctorateAlumniRouter.post(
  '/alumni-data',
  checkAdminAuth,
  multerLocalFileUploader.single('profilePicture'),
  uploadDoctorateAlumniCtrl
);

// Update doctorate alumni info router
doctorateAlumniRouter.patch(
  '/alumni-data/:id',
  checkAdminAuth,
  multerLocalFileUploader.single('profilePicture'),
  updateDoctorateAlumniCtrl
);

// Get all doctorate alumni info router
doctorateAlumniRouter.get('/alumni-data', getDoctorateAlumniCtrl);

// Get single doctorate alumni info router
doctorateAlumniRouter.get('/alumni-data/:id', getDoctorateAlumniCtrl);

// delete specific doctorate alumni info router
doctorateAlumniRouter.delete(
  '/alumni-data/:id',
  checkAdminAuth,
  deleteDoctorateAlumniCtrl
);

module.exports = doctorateAlumniRouter;
