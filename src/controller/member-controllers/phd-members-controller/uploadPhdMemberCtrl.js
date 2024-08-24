/**
 * PHD Member Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles the upload of individual PhD member data to the database.
 * It processes requests to add new PhD member records or update existing ones with
 * the provided data.
 *
 * Functionality:
 * - Receives a request with data for a PhD member to be uploaded.
 * - Validates the incoming data to ensure it meets the required format and criteria.
 * - Inserts or updates the PhD member record in the database based on the provided data.
 * - Handles any errors or issues that occur during the upload process and returns
 *   appropriate responses to the client.
 *
 * Usage:
 * Use this controller to upload or update the details of a PhD member in the database.
 * This operation is essential for adding new PhD members or modifying existing records
 * within the system.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const uploadPhdMemberCtrl = async (req, res) => {
  let profileImageUrl;
  let profileImgPublicId;
  let filePath;
  const {
    memberName,
    emailId,
    phoneNumber,
    mscDoneFrom,
    bscDoneFrom,
    researchGateId,
    googleScholarId,
    currentYear,
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
          await customSingleUploader(filePath, "phd_members_image");
        profileImageUrl = storedDataAccessUrl;
        profileImgPublicId = storedDataAccessId;
      }
      const phdMembersInfo = new phdMemberModel({
        memberName,
        profilePicture: profileImageUrl,
        profilePicturePublicId: profileImgPublicId,
        emailId,
        phoneNumber,
        mscDoneFrom,
        bscDoneFrom,
        researchGateId,
        googleScholarId,
        currentYear,
        details,
      });

      const uploadedData = await phdMembersInfo.save();
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
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/phd/members`
        );

        return res.status(201).json({
          message: "Phd members information has been successfully uploaded",
        });
      }
    } catch (error) {
      filePath && cleanupFile(filePath);
      profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));
      return res.status(500).json({
        Error: error.message,
        Details:
          "Unable to upload requested resources due to some technical error!",
      });
    }
  }
};
module.exports = uploadPhdMemberCtrl;
