// Content: PHD Member Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to update existing phd member info to the data base.

const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const updatePhdMemberCtrl = async (req, res) => {
  const id = req.params.id;
  const filePath = req.file ? req.file.path : null;
  let newMemberImage, newCloudPublicId;

  try {
    const getPreviousMemberInfo = await phdMemberModel.findById(id);
    if (!getPreviousMemberInfo) {
      filePath && cleanupFile(filePath);
      return res.status(404).json({ error: "Requested resources not found" });
    }

    const newMemberName =
      req.body.memberName || getPreviousMemberInfo.memberName;
    const newEmailId = req.body.emailId || getPreviousMemberInfo.emailId;
    const newPhoneNumber =
      req.body.phoneNumber || getPreviousMemberInfo.phoneNumber;
    const newMscDoneFrom =
      req.body.mscDoneFrom || getPreviousMemberInfo.mscDoneFrom;
    const newBscDoneFrom =
      req.body.bscDoneFrom || getPreviousMemberInfo.bscDoneFrom;
    const newResearchGateId =
      req.body.researchGateId || getPreviousMemberInfo.researchGateId;
    const newGoogleScholarId =
      req.body.googleScholarId || getPreviousMemberInfo.googleScholarId;
    const newCurrentYear =
      req.body.currentYear || getPreviousMemberInfo.currentYear;
    const newMemberDetails = req.body.details || getPreviousMemberInfo.details;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, "phd_members_image");
      newMemberImage = storedDataAccessUrl;
      newCloudPublicId = storedDataAccessId;

      getPreviousMemberInfo.profilePicturePublicId &&
        (await customSingleDestroyer(
          getPreviousMemberInfo.profilePicturePublicId
        ));
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
