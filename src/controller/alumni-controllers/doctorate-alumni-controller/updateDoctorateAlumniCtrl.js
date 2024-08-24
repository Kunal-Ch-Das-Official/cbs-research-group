// Content: Doctorate Alumni Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to update existing doctorate alumni data to the data base.

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const doctorateAlumniModel = require("../../../models/alumni-model/doctorate-alumni-model/doctorateAlumniModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const updateDoctorateAlumniCtrl = async (req, res) => {
  const { id } = req.params;
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
  const filePath = req.file ? req.file.path : null;
  let newAlumniImage, newCloudPublicId;

  try {
    const getPreviousAlumniInfo = await doctorateAlumniModel.findById(id);
    if (!getPreviousAlumniInfo) {
      filePath && cleanupFile(filePath);
      return res.status(404).json({ error: "Requested resources not found" });
    }

    const newAlumniName = alumniName || getPreviousAlumniInfo.alumniName;
    const newEmailId = emailId || getPreviousAlumniInfo.emailId;
    const newPhoneNumber = phoneNumber || getPreviousAlumniInfo.phoneNumber;
    const newMscDoneFrom = mscDoneFrom || getPreviousAlumniInfo.mscDoneFrom;
    const newBscDoneFrom = bscDoneFrom || getPreviousAlumniInfo.bscDoneFrom;
    const newResearchGateId =
      researchGateId || getPreviousAlumniInfo.researchGateId;
    const newGoogleScholarId =
      googleScholarId || getPreviousAlumniInfo.googleScholarId;
    const newYearOfPassout =
      yearOfPassout || getPreviousAlumniInfo.yearOfPassout;
    const newAlumniDetails = details || getPreviousAlumniInfo.details;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, "doctorate_alumni_image");

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
      mscDoneFrom: newMscDoneFrom,
      bscDoneFrom: newBscDoneFrom,
      researchGateId: newResearchGateId,
      googleScholarId: newGoogleScholarId,
      yearOfPassout: newYearOfPassout,
      details: newAlumniDetails,
    };

    const updateAlumniInfo = await doctorateAlumniModel.findByIdAndUpdate(
      id,
      updatedAlumniInfo,
      { new: true }
    );

    if (!updateAlumniInfo) {
      return res.status(405).json({
        error: "This operations are not allowed!",
        message: "Please check the details and try again later!",
      });
    } else {
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/doctorate/alumni-data/${id}`
      );
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/doctorate/alumni-data`
      );
      return res.status(200).json({
        message: "Doctorate alumni info's has been successfully updated!",
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

module.exports = updateDoctorateAlumniCtrl;
