// Content: Master Alumni Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to update existing masters alumni data to the data base.

const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const updateMastersAlumniCtrl = async (req, res) => {
  const id = req.params.id;
  const filePath = req.file ? req.file.path : null;
  let newAlumniImage, newCloudPublicId;

  try {
    const getPreviousAlumniInfo = await mastersAlumniModel.findById(id);
    if (!getPreviousAlumniInfo) {
      filePath && cleanupFile(filePath);
      return res.status(404).json({ error: "Requested resources not found" });
    }

    const newAlumniName =
      req.body.alumniName || getPreviousAlumniInfo.alumniName;
    const newEmailId = req.body.emailId || getPreviousAlumniInfo.emailId;
    const newPhoneNumber =
      req.body.phoneNumber || getPreviousAlumniInfo.phoneNumber;
    const newBscDoneFrom =
      req.body.bscDoneFrom || getPreviousAlumniInfo.bscDoneFrom;
    const newYearOfPassout =
      req.body.yearOfPassout || getPreviousAlumniInfo.yearOfPassout;
    const newAlumniDetails = req.body.details || getPreviousAlumniInfo.details;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, "masters_alumni_image");
      newAlumniImage = storedDataAccessUrl;
      newCloudPublicId = storedDataAccessId;

      getPreviousAlumniInfo.profilePicturePublicId &&
        (await customSingleDestroyer(
          getPreviousAlumniInfo.profilePicturePublicId
        ));

      cleanupFile(filePath);
    } else {
      newAlumniImage = getPreviousAlumniInfo.profilePicture;
      newCloudPublicId = getPreviousAlumniInfo.profilePicturePublicId;
    }

    const updatedAlumniInfo = {
      alumniName: newAlumniName,
      profilePicture: newAlumniImage,
      profilePicturePublicId: newCloudPublicId,
      emailId: newEmailId,
      phoneNumber: newPhoneNumber,
      bscDoneFrom: newBscDoneFrom,
      yearOfPassout: newYearOfPassout,
      details: newAlumniDetails,
    };

    const updateAlumniInfo = await mastersAlumniModel.findByIdAndUpdate(
      id,
      updatedAlumniInfo,
      { new: true }
    );

    if (!updateAlumniInfo) {
      return res.status(405).json({
        error: "This operations are not allowed!",
        message: "Please check the details and try again later!",
      });
    }

    res.status(200).json({
      message: "Masters alumni info's has been successfully updated!",
    });
  } catch (error) {
    filePath && cleanupFile(filePath);
    console.error("Unable to update due to some technical error:", error);
    res.status(500).json({
      error: "Unable to update due to some technical error",
      details: error.message,
    });
  }
};

module.exports = updateMastersAlumniCtrl;
