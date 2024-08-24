// Content: Master Alumni Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: Role of this controller is to upload individual masters alumni data to the data base.

const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");

const uploadMastersAlumniCtrl = async (req, res) => {
  let profileImageUrl;
  let profileImgPublicId;
  let filePath;
  const {
    alumniName,
    emailId,
    phoneNumber,
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
          await customSingleUploader(filePath, "masters_alumni_image");
        profileImageUrl = storedDataAccessUrl;
        profileImgPublicId = storedDataAccessId;
      }
      const mastersAlumniInfo = new mastersAlumniModel({
        alumniName,
        profilePicture: profileImageUrl,
        profilePicturePublicId: profileImgPublicId,
        emailId,
        phoneNumber,
        bscDoneFrom,
        researchGateId,
        googleScholarId,
        yearOfPassout,
        details,
      });

      const uploadedData = await mastersAlumniInfo.save();
      if (!uploadedData) {
        filePath && cleanupFile(filePath);
        profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));

        return res.status(405).json({
          error: "This operations are not allowed!",
          message: "Please check the details and try again later!",
        });
      } else {
        filePath && cleanupFile(filePath);
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/masters/alumni-data`
        );
        return res.status(201).json({
          message: "Masters alumni information has been successfully uploaded!",
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
module.exports = uploadMastersAlumniCtrl;
