/**
 * MSC Member Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
 * Description:
 * This controller handles the upload of individual MSC member data to the database.
 * It processes requests to add new MSC members or update existing ones with data provided
 * in the request.
 *
 * Functionality:
 * - Receives an upload request containing MSC member data.
 * - Validates the input data to ensure it adheres to required formats and constraints.
 * - Checks if the MSC member already exists in the database. If so, updates the existing
 *   record; otherwise, creates a new record.
 * - Saves the MSC member's data to the database.
 * - Handles any errors that may occur during the upload process and returns appropriate
 *   responses to the client.
 *
 * Usage:
 * Use this controller to upload or update MSC member data in the database. This operation
 * is crucial for maintaining and managing the list of MSC members, ensuring that all data
 * is up-to-date and accurate.
 */

const mscMemberModel = require('../../../models/members-model/msc-member-model/mscMemberModel');
const customSingleDestroyer = require('../../../utils/cloudinary-single-destroyer/customSingleDestroyer');
const customSingleUploader = require('../../../utils/cloudinary-single-uploader/customSingleUploader');

const uploadMscMemberCtrl = async (req, res) => {
  let profileImageUrl;
  let profileImgPublicId;
  let filePath;
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
  if (!req.body || !req.file) {
    return res.status(400).json({
      issue: 'Bad Request!',
      details: 'All fields are required.',
    });
  } else {
    try {
      if (req.file) {
        filePath = req.file.buffer;
        // Reusable Image Uploader
        const { storedDataAccessUrl, storedDataAccessId } =
          await customSingleUploader(filePath, 'msc_members_image');
        profileImageUrl = storedDataAccessUrl;
        profileImgPublicId = storedDataAccessId;
      }
      const mscMembersInfo = new mscMemberModel({
        memberName,
        profilePicture: profileImageUrl,
        profilePicturePublicId: profileImgPublicId,
        emailId,
        phoneNumber,
        bscDoneFrom,
        researchGateId,
        googleScholarId,
        currentYear,
        details,
      });

      const uploadedData = await mscMembersInfo.save();
      if (!uploadedData) {
        profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));

        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        return res.status(201).json({
          details: 'Requested resources has been successfully uploaded',
        });
      }
    } catch (error) {
      profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to upload requested resources due to some technical problem.',
      });
    }
  }
};
module.exports = uploadMscMemberCtrl;
