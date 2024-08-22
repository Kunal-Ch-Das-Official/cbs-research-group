// Content: Lab Instruments Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to update existing Lab Instrument info to the data base.

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
