// Content: Team Awards Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 23/08/2024
// Details: This is the router file for handle all routes of team awards of cbs research groups.

const express = require("express");

const multerLocalFileUploader = require("../../middlewares/multer-localfile-uploader/multerLocalFileUploader");
const uploadPublicationCtrl = require("../../controller/publication-controllers/uploadPublicationCtrl");
const updatePublicationCtrl = require("../../controller/publication-controllers/updatePublicationCtrl");
const deletePublicationCtrl = require("../../controller/publication-controllers/deletePublicationCtrl");
const getPublicationCtrl = require("../../controller/publication-controllers/getPublicationCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

const publicationRouter = express.Router();

const publicationCorsImage = multerLocalFileUploader.fields([
  { name: "publicationThumbnail", maxCount: 1 },
  { name: "firstOverview", maxCount: 1 },
  { name: "secondOverview", maxCount: 1 },
]);

publicationRouter.post(
  "/about-info",
  checkAdminAuth,
  publicationCorsImage,
  uploadPublicationCtrl
);

publicationRouter.patch(
  "/about-info/:id",
  checkAdminAuth,
  publicationCorsImage,
  updatePublicationCtrl
);
publicationRouter.get("/about-info", cacheMiddleware, getPublicationCtrl);
publicationRouter.get("/about-info/:id", cacheMiddleware, getPublicationCtrl);

publicationRouter.delete(
  "/about-info/:id",
  checkAdminAuth,
  deletePublicationCtrl
);

module.exports = publicationRouter;
