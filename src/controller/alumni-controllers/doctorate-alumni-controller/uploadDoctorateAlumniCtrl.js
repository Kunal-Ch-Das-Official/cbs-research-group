// Content: Doctorate Alumni Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: Role of this controller is to upload individual doctorate alumni data to the data base.

const doctorateAlumniModel = require("../../../models/alumni-model/doctorate-alumni-model/doctorateAlumniModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const uploadDoctorateAlumniCtrl = async (req, res) => {
  let profileImageUrl;
  let profileImgPublicId;
  let filePath;

  const {
    alumniName,
    emailId,
    phoneNumber,
    mscDoneFrom,
    bscDoneFrom,
    researchGateId,
    googleScholarId,
    yearOfPassout,
    details,
  } = req.body;

  if (!req.body || !req.file) {
    return res.status(400).json({
      error: "Bad request!",
      message: "Fill up all the fields carefully!!",
    });
  } else {
    try {
      if (req.file) {
        filePath = req.file.path;
        const { storedDataAccessUrl, storedDataAccessId } =
          await customSingleUploader(filePath, "doctorate_alumni_image");
        profileImageUrl = storedDataAccessUrl;
        profileImgPublicId = storedDataAccessId;
      }
      const doctorateAlumniInfo = new doctorateAlumniModel({
        alumniName,
        profilePicture: profileImageUrl,
        profilePicturePublicId: profileImgPublicId,
        emailId,
        phoneNumber,
        mscDoneFrom,
        bscDoneFrom,
        researchGateId,
        googleScholarId,
        yearOfPassout,
        details,
      });

      const uploadedData = await doctorateAlumniInfo.save();
      if (!uploadedData) {
        filePath && cleanupFile(filePath);
        profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));

        return res.status(405).json({
          error: "This operations are not allowed!",
          message: "Please check the details and try again later!",
        });
      } else {
        filePath && cleanupFile(filePath);
        return res.status(201).json({
          message:
            "Doctorate alumni informations has been successfully uploaded!",
        });
      }
    } catch (error) {
      filePath && cleanupFile(filePath);
      profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));
      console.log("Unable to upload requested resources due to:", error);
      return res.status(500).json({
        Error: error.message,
        Details:
          "Unable to upload requested resources due to some technical error!",
      });
    }
  }
};
module.exports = uploadDoctorateAlumniCtrl;
