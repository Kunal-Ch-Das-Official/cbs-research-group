// Content: MSC Member Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to update existing msc member info to the data base.

const mscMemberModel = require("../../../models/members-model/msc-member-model/mscMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const updateMscMemberCtrl = async (req, res) => {
  const id = req.params.id;
  const filePath = req.file ? req.file.path : null;
  let newMemberImage, newCloudPublicId;

  try {
    const getPreviousMemberInfo = await mscMemberModel.findById(id);
    if (!getPreviousMemberInfo) {
      filePath && cleanupFile(filePath);
      return res.status(404).json({ error: "Requested resources not found" });
    }

    const newMemberName =
      req.body.memberName || getPreviousMemberInfo.memberName;
    const newEmailId = req.body.emailId || getPreviousMemberInfo.emailId;
    const newPhoneNumber =
      req.body.phoneNumber || getPreviousMemberInfo.phoneNumber;
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
        await customSingleUploader(filePath, "msc_members_image");
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
    }

    res
      .status(200)
      .json({ message: "Msc members Info has been successfully updated!" });
  } catch (error) {
    filePath && cleanupFile(filePath);
    console.error("Unable to update due to some technical error:", error);
    res.status(500).json({
      error: "Unable to update due to some technical error",
      details: error.message,
    });
  }
};
module.exports = updateMscMemberCtrl;
