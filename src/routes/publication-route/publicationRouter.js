/**
 * Team Awards Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 23/08/2024
 * Last update: 08/10/2024
 * Description:
 * This router manages all routes related to team awards for the
 * CBS Research Group. It defines endpoints for handling team awards data,
 * including operations such as creating, reading, updating, and
 * deleting award records.
 *
 * Usage:
 * Use this router to manage routes for interacting with team awards data.
 * It ensures that requests related to team awards are properly processed
 * and routed to the appropriate handlers or services.
 */

const express = require('express');

const multerLocalFileUploader = require('../../middlewares/multer-localfile-uploader/multerLocalFileUploader');
const uploadPublicationCtrl = require('../../controller/publication-controllers/uploadPublicationCtrl');
const updatePublicationCtrl = require('../../controller/publication-controllers/updatePublicationCtrl');
const deletePublicationCtrl = require('../../controller/publication-controllers/deletePublicationCtrl');
const {
  getPublicationCtrl,
} = require('../../controller/publication-controllers/getPublicationCtrl');
const checkAdminAuth = require('../../middlewares/auth-middleware/authAdminMiddleware');

const publicationRouter = express.Router();

// Gather all file which are going to be uploaded on cloud
const publicationCorsImage = multerLocalFileUploader.fields([
  { name: 'publicationThumbnail', maxCount: 1 },
  { name: 'firstOverview', maxCount: 1 },
  { name: 'secondOverview', maxCount: 1 },
]);

// Post publication router
publicationRouter.post(
  '/about-info',
  checkAdminAuth,
  publicationCorsImage,
  uploadPublicationCtrl
);

// Update publication router
publicationRouter.patch(
  '/about-info/:id',
  checkAdminAuth,
  publicationCorsImage,
  updatePublicationCtrl
);
// Get all publication router
publicationRouter.get('/about-info', getPublicationCtrl);
// Get single publication router
publicationRouter.get('/about-info/:id', getPublicationCtrl);

// Delete specific publication router
publicationRouter.delete(
  '/about-info/:id',
  checkAdminAuth,
  deletePublicationCtrl
);

module.exports = publicationRouter;
