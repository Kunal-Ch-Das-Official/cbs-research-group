/**
 * Update Publication Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 23/08/2024
 *
 * Description:
 * This controller manages the updating of publication details in the database.
 * It handles requests to modify existing publication records based on client input,
 * ensuring that publication information is kept current and accurate.
 *
 * Functionality:
 * - Receives requests to update publication details in the database.
 * - Validates the request to ensure the publication exists and the provided data is correct.
 * - Performs the update operation and saves the changes to the database.
 * - Handles any errors during the update process and provides appropriate responses.
 *
 * Usage:
 * Use this controller to update publication details in the database. It ensures that
 * publication information remains up-to-date and reflects the most recent changes.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const publicationModel = require("../../models/publication-model/publicationModel");
const customSingleDestroyer = require("../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../utils/custom-file-cleaner/localFileCleaner");

const updatePublicationCtrl = async (req, res) => {
  try {
    const updateFields = {};

    // Helper function to handle file updates
    const handleFileUpdate = async (field, req) => {
      if (req.files && req.files[field] === undefined) {
        const findField = await publicationModel.findById(req.params.id);
        if (!findField) {
          return res.status(404).json({
            issue: "Not found!",
            details: "Requested resources are not found.",
          });
        }
        updateFields[field] = findField[field];
        updateFields[`${field}PublicId`] = findField[`${field}PublicId`];
      } else {
        const getFieldInfo = await publicationModel.findById(req.params.id);
        await customSingleDestroyer(getFieldInfo[`${field}PublicId`]);
        const uploadNewImg = await customSingleUploader(
          req.files[field][0].path,
          "publication_image"
        );
        updateFields[field] = uploadNewImg.storedDataAccessUrl;
        updateFields[`${field}PublicId`] = uploadNewImg.storedDataAccessId;
        cleanupFile(req.files[field][0].path);
      }
    };

    // Handle the updates for each file field
    await handleFileUpdate("publicationThumbnail", req);
    await handleFileUpdate("firstOverview", req);
    await handleFileUpdate("secondOverview", req);

    // Update the rest of the fields from req.body if not empty
    const findPublication = await publicationModel.findById(req.params.id);
    if (!findPublication) {
      return res.status(404).json({
        issue: "Not found!",
        details: "Requested resources are not found.",
      });
    }

    Object.keys(req.body).forEach((key) => {
      updateFields[key] =
        req.body[key] === "" ? findPublication[key] : req.body[key];
    });

    // Update the publication with the collected fields
    const updatedPublication = await publicationModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedPublication) {
      return res.status(501).json({
        issue: "Not implemented!",
        details: "Something went wrong, please try again later.",
      });
    } else {
      clearCache(
        "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/publication/about-info"
      );
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/publication/about-info/${req.params.id}`
      );
      return res.status(200).json({
        details: "Requested resources has been updated successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        "Unable to update requested resources due to some technical problem.",
    });
  }
};

module.exports = updatePublicationCtrl;
