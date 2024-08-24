/**
 * MSC Member Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
 * Description:
 * This controller handles the updating of existing MSC member information in the
 * database. It processes update requests to ensure that the MSC members' data is
 * kept accurate and up-to-date.
 *
 * Functionality:
 * - Receives an update request for an MSC member.
 * - Validates and processes the input data to ensure it meets required formats and
 *   constraints.
 * - Retrieves the specific MSC member's record from the database.
 * - Updates the member's information with the new data provided.
 * - Saves the updated information back to the database.
 * - Returns a success response or handles any errors that occur during the update process.
 *
 * Usage:
 * Use this controller to update the details of MSC members in the database.
 * This is essential for maintaining accurate records and ensuring that the data
 * reflects any changes or updates made by the members.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const mscMemberModel = require("../../../models/members-model/msc-member-model/mscMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const updateMscMemberCtrl = async (req, res) => {
  const { id } = req.params;
  const {
    memberName,
    emailId,
    phoneNumber,
    bscDoneFrom,
    researchGateId,
    googleScholarId,
    currentYear,
    details,
  } = req.body;
  const filePath = req.file ? req.file.path : null;
  let newMemberImage, newCloudPublicId;

  try {
    const getPreviousMemberInfo = await mscMemberModel.findById(id);
    if (!getPreviousMemberInfo) {
      filePath && cleanupFile(filePath);
      return res.status(404).json({ error: "Requested resources not found" });
    }

    const newMemberName = memberName || getPreviousMemberInfo.memberName;
    const newEmailId = emailId || getPreviousMemberInfo.emailId;
    const newPhoneNumber = phoneNumber || getPreviousMemberInfo.phoneNumber;
    const newBscDoneFrom = bscDoneFrom || getPreviousMemberInfo.bscDoneFrom;
    const newResearchGateId =
      researchGateId || getPreviousMemberInfo.researchGateId;
    const newGoogleScholarId =
      googleScholarId || getPreviousMemberInfo.googleScholarId;
    const newCurrentYear = currentYear || getPreviousMemberInfo.currentYear;
    const newMemberDetails = details || getPreviousMemberInfo.details;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, "msc_members_image");
      newMemberImage = storedDataAccessUrl;
      newCloudPublicId = storedDataAccessId;

      const { profilePicturePublicId } = getPreviousMemberInfo;
      profilePicturePublicId &&
        (await customSingleDestroyer(profilePicturePublicId));
      filePath && cleanupFile(filePath);
    } else {
      newMemberImage = getPreviousMemberInfo.profilePicture;
      newCloudPublicId = getPreviousMemberInfo.profilePicturePublicId;
    }

    const updatedMemberInfo = {
      memberName: newMemberName,
      profilePicture: newMemberImage,
      profilePicturePublicId: newCloudPublicId,
      emailId: newEmailId,
      phoneNumber: newPhoneNumber,
      bscDoneFrom: newBscDoneFrom,
      researchGateId: newResearchGateId,
      googleScholarId: newGoogleScholarId,
      currentYear: newCurrentYear,
      details: newMemberDetails,
    };

    const updateMemberInfo = await mscMemberModel.findByIdAndUpdate(
      id,
      updatedMemberInfo,
      { new: true }
    );

    if (!updateMemberInfo) {
      return res.status(405).json({
        error: "This operations are not allowed!",
        message: "Please check the details and try again later!",
      });
    } else {
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/msc/members`
      );
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/msc/members/${id}`
      );
      return res
        .status(200)
        .json({ message: "Msc members Info has been successfully updated!" });
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
module.exports = updateMscMemberCtrl;
