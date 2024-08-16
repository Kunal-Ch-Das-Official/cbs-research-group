// Content: Doctorate Alumni Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: Role of this controller is to upload individual doctorate alumni data to the data base.

const cloudinaryConfig = require("../../../config/cloudinaryConfig");
const doctorateAlumniModel = require("../../../models/alumni-model/doctorate-alumni-model/doctorateAlumniModel");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const uploadDoctorateAlumniCtrl = async (req, res) => {
  let filePath;
  let alumniProfilePic;

  try {
    if (req.body && req.file) {
      // Get the file path
      filePath = req.file.path;

      if (!filePath) {
        return res.status(400).json({ error: "File path is invalid!" });
      }

      // Upload Profile Image to Cloudinary
      alumniProfilePic = await cloudinaryConfig.uploader.upload(filePath, {
        folder: "doctorate_alumni_image",
      });

      // Save the alumni details to the database
      const doctorateAlumniDetails = new doctorateAlumniModel({
        alumniName: req.body.alumniName,
        profilePicture: alumniProfilePic.secure_url,
        profilePicturePublicId: alumniProfilePic.public_id,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        mscDoneFrom: req.body.mscDoneFrom,
        bscDoneFrom: req.body.bscDoneFrom,
        yearOfPassout: req.body.yearOfPassout,
        details: req.body.details,
      });

      await doctorateAlumniDetails.save();

      res.status(201).json({
        message: "Doctorate alumni details have been successfully uploaded!",
      });

      // Remove the profile image from the local directory
      cleanupFile(filePath);
    } else {
      res
        .status(400)
        .json({ error: "Bad request! Missing file or body content." });

      if (alumniProfilePic && alumniProfilePic.public_id) {
        await cloudinaryConfig.uploader.destroy(alumniProfilePic.public_id);
        console.log("Cloudinary image has been destroyed!");
      }

      filePath && cleanupFile(filePath);
    }
  } catch (error) {
    if (alumniProfilePic && alumniProfilePic.public_id) {
      await cloudinaryConfig.uploader.destroy(alumniProfilePic.public_id);
      console.log("Cloudinary image has been destroyed!");
    }

    filePath && cleanupFile(filePath);

    console.error("Error occurred during alumni upload:", error);
    res.status(500).json({
      response: "Unable to upload due to a technical error!",
      error: error.message,
    });
  }
};
module.exports = uploadDoctorateAlumniCtrl;
