/**
 * Doctorate Alumni Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles the process of updating existing records of
 * doctorate alumni in the database. It manages the modification of
 * alumni data based on client or admin requests.
 *
 * Functionality:
 * - Receives and processes requests to update existing doctorate alumni
 *   information.
 * - Validates the incoming data to ensure accuracy and integrity.
 * - Updates the specified alumni records in the database with the new data.
 * - Provides appropriate responses for successful and failed update
 *   operations.
 *
 * Usage:
 * Use this controller to manage the updating of doctorate alumni records
 * in the database. It ensures that existing alumni data can be accurately
 * modified as needed.
 */

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
      return res.status(404).json({
        issue: "Not found!",
        details: "Requested resources are not found.",
      });
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
      return res.status(501).json({
        issue: "Not implemented!",
        details: "Something went wrong, please try again later.",
      });
    } else {
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/doctorate/alumni-data/${id}`
      );
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/doctorate/alumni-data`
      );
      return res.status(200).json({
        details: "Requested resources has been successfully updated!",
      });
    }
  } catch (error) {
    filePath && cleanupFile(filePath);
    return res.status(500).json({
      issue: error.message,
      details:
        "Unable to update the requested resources due to some technical problem.",
    });
  }
};

module.exports = updateDoctorateAlumniCtrl;
