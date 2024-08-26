/**
 * Lab Instruments Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles the process of uploading new lab instrument data to
 * the database. It is responsible for receiving and processing requests to
 * add new lab instruments, ensuring that the provided information is correctly
 * inserted into the database.
 *
 * Functionality:
 * - Receives upload requests containing new lab instrument data from the client.
 * - Validates the incoming data to ensure it meets required criteria and format.
 * - Inserts the new lab instrument records into the database.
 * - Handles any errors that occur during the upload process and provides feedback.
 *
 * Usage:
 * Use this controller to add new lab instruments to the database. It is essential
 * for expanding and updating the inventory of lab instruments, allowing for accurate
 * and up-to-date records in the system.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const labInstrumentModel = require("../../models/lab-instruments-model/labInstrumentModel");
const customSingleDestroyer = require("../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../utils/custom-file-cleaner/localFileCleaner");

// Details: Role of this controller is to upload single lab instrument info to the data base.
const uploadLabInstrumentCtrl = async (req, res) => {
  const { instrumentName, description } = req.body;
  let labInstrumentImageUrl;
  let labInstrumentImgPublicId;
  let filePath;

  if (!req.body || !req.file) {
    return res.status(400).json({
      issue: "Bad Request!",
      details: "All fields are required.",
    });
  } else {
    try {
      if (req.file) {
        filePath = req.file.path;
        const { storedDataAccessUrl, storedDataAccessId } =
          await customSingleUploader(filePath, "lab_instruments_image");
        labInstrumentImageUrl = storedDataAccessUrl;
        labInstrumentImgPublicId = storedDataAccessId;
      }
      const labInstrumentsInfo = new labInstrumentModel({
        instrumentName: instrumentName,
        instrumentImage: labInstrumentImageUrl,
        instrumentImagePublicId: labInstrumentImgPublicId,
        description: description,
      });

      const uploadedData = await labInstrumentsInfo.save();
      if (!uploadedData) {
        filePath && cleanupFile(filePath);
        labInstrumentImgPublicId &&
          (await customSingleDestroyer(labInstrumentImgPublicId));

        return res.status(501).json({
          issue: "Not implemented!",
          details: "Something went wrong, please try again later.",
        });
      } else {
        filePath && cleanupFile(filePath);
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/facilities/lab-instruments`
        );
        return res.status(201).json({
          details: "Requested resources has been successfully uploaded!",
        });
      }
    } catch (error) {
      filePath && cleanupFile(filePath);
      labInstrumentImgPublicId &&
        (await customSingleDestroyer(labInstrumentImgPublicId));
      return res.status(500).json({
        issue: error.message,
        details:
          "Unable to upload requested resources due to some technical problem.",
      });
    }
  }
};
module.exports = uploadLabInstrumentCtrl;
