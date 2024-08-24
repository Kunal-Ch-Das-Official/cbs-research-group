// Content: PHD Member Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to update existing phd member info to the data base.

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const updatePhdMemberCtrl = async (req, res) => {
  const { id } = req.params;
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
  const filePath = req.file ? req.file.path : null;
  let newMemberImage, newCloudPublicId;

  try {
    const getPreviousMemberInfo = await phdMemberModel.findById(id);
    if (!getPreviousMemberInfo) {
      filePath && cleanupFile(filePath);
      return res.status(404).json({ error: "Requested resources not found" });
    }

    const newMemberName = memberName || getPreviousMemberInfo.memberName;
    const newEmailId = emailId || getPreviousMemberInfo.emailId;
    const newPhoneNumber = phoneNumber || getPreviousMemberInfo.phoneNumber;
    const newMscDoneFrom = mscDoneFrom || getPreviousMemberInfo.mscDoneFrom;
    const newBscDoneFrom = bscDoneFrom || getPreviousMemberInfo.bscDoneFrom;
    const newResearchGateId =
      researchGateId || getPreviousMemberInfo.researchGateId;
    const newGoogleScholarId =
      googleScholarId || getPreviousMemberInfo.googleScholarId;
    const newCurrentYear = currentYear || getPreviousMemberInfo.currentYear;
    const newMemberDetails = details || getPreviousMemberInfo.details;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, "phd_members_image");
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
      mscDoneFrom: newMscDoneFrom,
      bscDoneFrom: newBscDoneFrom,
      researchGateId: newResearchGateId,
      googleScholarId: newGoogleScholarId,
      currentYear: newCurrentYear,
      details: newMemberDetails,
    };

    const updateMemberInfo = await phdMemberModel.findByIdAndUpdate(
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
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/phd/members`
      );
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/phd/members/${id}`
      );
      return res
        .status(200)
        .json({ message: "Phd members info has been successfully updated!" });
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

module.exports = updatePhdMemberCtrl;
