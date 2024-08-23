// Content: Project Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 23/08/2024
// Details: Role of this controller is to upload project details to the database.

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
          return res.status(404).send("Publication not found");
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
      return res.status(404).send("Publication not found");
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
      return res.status(404).send("Publication not found");
    }

    res.status(200).json({
      status: 200,
      message: "Publication has been updated successfully!",
    });
  } catch (error) {
    res.status(500).send(`Technical error: ${error.message}`);
  }
};

module.exports = updatePublicationCtrl;
