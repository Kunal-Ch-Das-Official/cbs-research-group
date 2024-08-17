// Content: PHD Member Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to upload individual phd members data to the data base.

const cloudinaryConfig = require("../../../config/cloudinaryConfig");
const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const uploadPhdMemberCtrl = async (req, res) => {
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
        const storeMemberProfileImage = await cloudinaryConfig.uploader.upload(
          filePath,
          {
            folder: "phd_members_image",
          }
        );
        profileImageUrl = storeMemberProfileImage.secure_url;
        profileImgPublicId = storeMemberProfileImage.public_id;
      }
      const phdMembersInfo = new phdMemberModel({
        memberName: req.body.memberName,
        profilePicture: profileImageUrl,
        profilePicturePublicId: profileImgPublicId,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        mscDoneFrom: req.body.mscDoneFrom,
        bscDoneFrom: req.body.bscDoneFrom,
        currentYear: req.body.currentYear,
        details: req.body.details,
      });

      const uploadedData = await phdMembersInfo.save();
      if (!uploadedData) {
        filePath && cleanupFile(filePath);
        if (profileImageUrl && profileImgPublicId) {
          await cloudinaryConfig.uploader
            .destroy(profileImgPublicId)
            .then(() => {
              console.log({
                message: "Image successfully deleted from cloudinary!",
                reason: "error",
              });
            });
        }

        res.status(405).json({
          error: "This operations are not allowed!",
          message: "Please check the details and try again later!",
        });
      } else {
        res.status(201).json({
          message: "Phd members information has been successfully uploaded",
        });
        filePath && cleanupFile(filePath);
      }
    } catch (error) {
      filePath && cleanupFile(filePath);
      if (profileImageUrl && profileImgPublicId) {
        await cloudinaryConfig.uploader.destroy(profileImgPublicId).then(() => {
          console.log({
            message: "Image successfully deleted from cloudinary!",
            reason: "error",
          });
        });
      }
      console.log("Unable to upload requested resources due to:", error);
      res.status(500).json({
        Error: error.message,
        Details:
          "Unable to upload requested resources due to some technical error!",
      });
    }
  }
};
module.exports = uploadPhdMemberCtrl;
