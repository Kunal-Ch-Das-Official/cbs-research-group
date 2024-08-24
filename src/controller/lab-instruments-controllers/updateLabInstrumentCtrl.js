/**
 * Lab Instruments Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller is responsible for updating existing lab instrument information in
 * the database. It handles requests to modify data related to lab instruments, ensuring
 * that the database remains current with the latest information.
 *
 * Functionality:
 * - Receives update requests for lab instrument data from the client.
 * - Validates the incoming data to ensure it meets required criteria.
 * - Updates the relevant lab instrument records in the database with the new information.
 * - Handles errors and provides appropriate feedback if the update process fails.
 *
 * Usage:
 * Utilize this controller to modify or correct details of lab instruments as needed.
 * It is essential for maintaining the accuracy and relevance of lab instrument data
 * in the database, which supports effective data management and reporting.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const labInstrumentModel = require("../../models/lab-instruments-model/labInstrumentModel");
const customSingleDestroyer = require("../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../utils/custom-file-cleaner/localFileCleaner");

const updateLabInstrumentCtrl = async (req, res) => {
  const { id } = req.params;
  const { instrumentName, description } = req.body;
  const filePath = req.file ? req.file.path : null;
  let newInstrumentImage, newInstrumentImgCloudId;

  try {
    const getPreviousInstrumentInfo = await labInstrumentModel.findById(id);
    if (!getPreviousInstrumentInfo) {
      filePath && cleanupFile(filePath);
      return res.status(404).json({ error: "Requested resources not found" });
    }

    const newInstrumentName =
      instrumentName || getPreviousInstrumentInfo.instrumentName;

    const newInstrumentDescription =
      description || getPreviousInstrumentInfo.description;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, "lab_instruments_image");
      newInstrumentImage = storedDataAccessUrl;
      newInstrumentImgCloudId = storedDataAccessId;

      const { instrumentImagePublicId } = getPreviousInstrumentInfo;
      instrumentImagePublicId &&
        (await customSingleDestroyer(instrumentImagePublicId));
      filePath && cleanupFile(filePath);
    } else {
      newInstrumentImage = getPreviousInstrumentInfo.instrumentImage;
      newInstrumentImgCloudId =
        getPreviousInstrumentInfo.instrumentImagePublicId;
    }

    const updatedInstrumentInfo = {
      instrumentName: newInstrumentName,
      instrumentImage: newInstrumentImage,
      instrumentImagePublicId: newInstrumentImgCloudId,
      description: newInstrumentDescription,
    };

    const updateInstrumentInfo = await labInstrumentModel.findByIdAndUpdate(
      id,
      updatedInstrumentInfo,
      { new: true }
    );

    if (!updateInstrumentInfo) {
      return res.status(405).json({
        error: "This operations are not allowed!",
        message: "Please check the details and try again later!",
      });
    } else {
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/facilities/lab-instruments`
      );
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/facilities/lab-instruments/${id}`
      );
      return res.status(200).json({
        message: "Lab instrument info has been successfully updated!",
      });
    }
  } catch (error) {
    filePath && cleanupFile(filePath);
    console.error("Unable to update due to some technical error:", error);
    return res.status(500).json({
      error: "Unable to update due to some technical error",
      details: error.message,
    });
  }
};

module.exports = updateLabInstrumentCtrl;
