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
  let filePath = req.file.path;
  let newAlumniName;
  let newAlumniImage;
  let newCloudPublicId;
  let newEmailId;
  let newPhoneNumber;
  let newBseDoneFrom;
  let newAlumniDetails;
  try {
    const getPreviousAlumniInfo = await mastersAlumniModel.findById(id);
    if (!req.body.alumniName) {
      newAlumniName = getPreviousAlumniInfo.alumniName;
    } else {
      newAlumniName = req.body.alumniName;
    }
    if (!req.file) {
      newAlumniImage = getPreviousAlumniInfo.profilePicture;
      newCloudPublicId = getPreviousAlumniInfo.profilePicturePublicId;
    } else {
      const newAlumniImageUpload = await cloudinaryConfig.uploader.upload(
        filePath,
        {
          folder: "masters_alumni_image",
        }
      );
      newAlumniImage = newAlumniImageUpload.secure_url;
      newCloudPublicId = newAlumniImageUpload.public_id;

      if (newAlumniImageUpload) {
        const getPreviousPublicId =
          getPreviousAlumniInfo.profilePicturePublicId;
        await cloudinaryConfig.uploader
          .destroy(getPreviousPublicId)
          .then(() => {
            console.log({
              message: "Image successfully deleted from cloudinary!",
              status: 200,
              operation: "Destroy cloud image if file available.",
            });
          });
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(
              "Unable to delete image path from local directory due to:",
              err
            );
          } else {
            console.log(
              "image has been successfully deleted from local directory!!"
            );
          }
        });
      } else {
        console.log({
          message: "Unable to delete image from cloudinary",
          status: 500,
          operation: "show message if there is an error.",
        });
      }
    }
    if (!req.body.emailId) {
      newEmailId = getPreviousAlumniInfo.emailId;
    } else {
      newEmailId = req.body.emailId;
    }
    if (!req.body.phoneNumber) {
      newPhoneNumber = getPreviousAlumniInfo.phoneNumber;
    } else {
      newPhoneNumber = req.body.phoneNumber;
    }
    if (!req.body.bscDoneFrom) {
      newBseDoneFrom = getPreviousAlumniInfo.bscDoneFrom;
    } else {
      newBseDoneFrom = req.body.bscDoneFrom;
    }
    if (!req.body.details) {
      newAlumniDetails = getPreviousAlumniInfo.details;
    } else {
      newAlumniDetails = req.body.details;
    }

    const updatedAlumniInfo = {
      alumniName: newAlumniName,
      profilePicture: newAlumniImage,
      profilePicturePublicId: newCloudPublicId,
      emailId: newEmailId,
      phoneNumber: newPhoneNumber,
      bscDoneFrom: newBseDoneFrom,
      details: newAlumniDetails,
    };

    const updateAlumniInfo = await mastersAlumniModel.findByIdAndUpdate(
      id,
      updatedAlumniInfo,
      { new: true }
    );
    if (!updateAlumniInfo) {
      filePath &&
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(
              "Unable to delete image path from local directory due to:",
              err
            );
          } else {
            console.log(
              "image has been successfully deleted from local directory!!"
            );
          }
        });
      res.status(404).json({
        error: "Requested resources are not found",
      });
    } else {
      res.status(200).json({
        message: "Document has been successfully updated!!",
      });
    }
  } catch (error) {
    filePath &&
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(
            "Unable to delete image path from local directory due to:",
            err
          );
        } else {
          console.log(
            "image has been successfully deleted from local directory!!"
          );
        }
      });

    console.log("Unable to update due to some technical error");
    res.status(500).json({
      Error: "unable to update due to some technical error",
      details: error.message,
    });
  }
};
module.exports = updateMastersAlumniCtrl;
