// Content: Master Alumni Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to update existing masters alumni data to the data base.

const cloudinaryConfig = require("../../../config/cloudinaryConfig");
const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");
const fs = require("fs");

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
      const newAlumniImageUpload = await cloudinaryConfig.uploader.upload(
        filePath,
        {
          folder: "masters_alumni_image",
        }
      );

      newAlumniImage = newAlumniImageUpload.secure_url;
      newCloudPublicId = newAlumniImageUpload.public_id;

      await cloudinaryConfig.uploader.destroy(
        getPreviousAlumniInfo.profilePicturePublicId
      );
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
      return res.status(404).json({ error: "Requested resources not found" });
    }

    res
      .status(200)
      .json({ message: "Document has been successfully updated!" });
  } catch (error) {
    filePath && cleanupFile(filePath);
    console.error("Unable to update due to some technical error:", error);
    res.status(500).json({
      error: "Unable to update due to some technical error",
      details: error.message,
    });
  }
};

// Helper function for file cleanup
const cleanupFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Unable to delete file from local directory:", err);
    } else {
      console.log("File successfully deleted from local directory!");
    }
  });
};

module.exports = updateMastersAlumniCtrl;
