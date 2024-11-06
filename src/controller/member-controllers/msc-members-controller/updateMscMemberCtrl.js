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

const mscMemberModel = require('../../../models/members-model/msc-member-model/mscMemberModel');
const customSingleDestroyer = require('../../../utils/cloudinary-single-destroyer/customSingleDestroyer');
const customSingleUploader = require('../../../utils/cloudinary-single-uploader/customSingleUploader');

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
  const filePath = req.file ? req.file.buffer : null;
  let newMemberImage, newCloudPublicId;

  try {
    const getPreviousMemberInfo = await mscMemberModel.findById(id);
    if (!getPreviousMemberInfo) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
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
        await customSingleUploader(filePath, 'msc_members_image');
      newMemberImage = storedDataAccessUrl;
      newCloudPublicId = storedDataAccessId;

      const { profilePicturePublicId } = getPreviousMemberInfo;
      profilePicturePublicId &&
        (await customSingleDestroyer(profilePicturePublicId));
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
      return res.status(501).json({
        issue: 'Not implemented!',
        details: 'Something went wrong, please try again later.',
      });
    } else {
      return res.status(200).json({
        details: 'Requested resources has been successfully updated!',
      });
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to update requested resources due to some technical problem.',
    });
  }
};
module.exports = updateMscMemberCtrl;
