// Content: Master Alumni Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: Role of this controller is to upload individual masters alumni data to the data base.

const fs = require("fs");
const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");
const cloudinaryConfig = require("../../../config/cloudinaryConfig");

const uploadMastersAlumniCtrl = async (req, res) => {
  let filePath;
  let alumniProfilePic;
  try {
    // If body content is available :
    if (req.body && req.file) {
      // Catch the file path from request params:
      filePath = req.file.path;

      // If body content is unavailable :
      if (!filePath) {
        return res.status(400).json({ error: "File path is invalid!" });
      }

      // Upload Profile Image to cloudinary:
      alumniProfilePic = await cloudinaryConfig.uploader.upload(filePath, {
        folder: "masters_alumni_image",
      });

      // Upload alumni details to the database:
      const mastersAlumniDetails = new mastersAlumniModel({
        alumniName: req.body.alumniName,
        profilePicture: alumniProfilePic.secure_url,
        profilePicturePublicId: alumniProfilePic.public_id,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        bscDoneFrom: req.body.bscDoneFrom,
        details: req.body.details,
      });

      // Then save the info to the database:
      await mastersAlumniDetails.save().then(() => {
        // Send response to the client:
        res.status(201).json({
          message: "Masters alumni details has been successfully uploaded!!",
        });

        // Remove the profile image from the local directory:
        filePath &&
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting the file from local folder:", err);
            } else {
              console.log("File successfully deleted from local directory!");
            }
          });
      });

      // If form fealds are empty the throw error:
    } else {
      res
        .status(400)
        .json({ error: "Bad request! missing file or body content." });

      // The image has been uploaded to the cloud, that's why need to destroy it:
      await cloudinaryConfig.uploader
        .destroy(alumniProfilePic && alumniProfilePic.public_id)
        .then(() => {
          console.log("Cloudinary image has been destroyed!!");
        });

      // Also file has been saved to the local directory need to delete:
      filePath &&
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting the file from local folder:", err);
          } else {
            console.log("File successfully deleted from local directory!");
          }
        });
    }

    // If unable to access database or server error throw this:
  } catch (error) {
    // The image has been uploaded to the cloud, that's why need to clean it up:
    await cloudinaryConfig.uploader
      .destroy(alumniProfilePic && alumniProfilePic.public_id)
      .then(() => {
        console.log("Cloudinary image has been destroyed!!");
      });
    // Also file has been saved to the local directory need to delete:
    filePath &&
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting the file from local folder:", err);
        } else {
          console.log("File successfully deleted from local directory!");
        }
      });
    // After all send the error to the client side:
    console.error("Error occurred during blog upload:", error);
    res.status(500).json({
      response: "Unable to upload due to a technical error!",
      Error: error.message,
    });
  }
};

module.exports = uploadMastersAlumniCtrl;
