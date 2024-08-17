// Content: MSC Member Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to upload individual msc members data to the data base.

const mscMemberModel = require("../../../models/members-model/msc-member-model/mscMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const uploadMscMemberCtrl = async (req, res) => {
  let profileImageUrl;
  let profileImgPublicId;
  let filePath;

  if (!req.body || !req.file) {
    res.status(400).json({
      error: "Bad request!",
      message: "Fill up all the fields carefully!!",
    });
  } else {
    try {
      if (req.file) {
        filePath = req.file.path;
        // Reusable Image Uploader
        const { storedDataAccessUrl, storedDataAccessId } =
          await customSingleUploader(filePath, "msc_members_image");
        profileImageUrl = storedDataAccessUrl;
        profileImgPublicId = storedDataAccessId;
      }
      const mscMembersInfo = new mscMemberModel({
        memberName: req.body.memberName,
        profilePicture: profileImageUrl,
        profilePicturePublicId: profileImgPublicId,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        bscDoneFrom: req.body.bscDoneFrom,
        currentYear: req.body.currentYear,
        details: req.body.details,
      });

      const uploadedData = await mscMembersInfo.save();
      if (!uploadedData) {
        filePath && cleanupFile(filePath);
        profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));

        res.status(405).json({
          error: "This operations are not allowed!",
          message: "Please check the details and try again later!",
        });
      } else {
        res.status(201).json({
          message: "Msc members information has been successfully uploaded",
        });
        filePath && cleanupFile(filePath);
      }
    } catch (error) {
      filePath && cleanupFile(filePath);
      profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));
      console.log("Unable to upload requested resources due to:", error);
      res.status(500).json({
        Error: error.message,
        Details:
          "Unable to upload requested resources due to some technical error!",
      });
    }
  }
};
module.exports = uploadMscMemberCtrl;
