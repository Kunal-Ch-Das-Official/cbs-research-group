/**
 * Delete Specific PHD Members Info By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 * Last update: 08/10/2024
 * Description:
 * This controller handles the deletion of a specific PhD member's data from the database
 * based on a client's request. It processes the request to remove the PhD member's record
 * identified by a unique identifier provided in the request.
 *
 * Functionality:
 * - Receives a request to delete a PhD member's record, including the unique identifier
 *   of the member to be deleted.
 * - Validates the request to ensure that the identifier is valid and corresponds to an
 *   existing PhD member.
 * - Deletes the specified PhD member's record from the database.
 * - Handles any errors that may occur during the deletion process and returns appropriate
 *   responses to the client.
 *
 * Usage:
 * Use this controller to delete a specific PhD member's data from the database. This
 * operation is useful for removing outdated or incorrect information and maintaining the
 * accuracy and relevance of the PhD members' records.
 */

const phdMemberModel = require('../../../models/members-model/phd-member-model/phdMemberModel');
const customSingleDestroyer = require('../../../utils/cloudinary-single-destroyer/customSingleDestroyer');
const { dashboardCache } = require('../../dashboard-controllers/getAllData');
const { phdMemberCache } = require('./getPhdMembersCtrl');

const deletePhdMemberCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequestedMembersInfo = await phdMemberModel.findById(id);
    const { profilePicturePublicId } = getRequestedMembersInfo;

    if (!getRequestedMembersInfo) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      profilePicturePublicId &&
        (await customSingleDestroyer(profilePicturePublicId));
      const deleteRequestedMembersInfo = await phdMemberModel.findByIdAndDelete(
        id
      );
      if (!deleteRequestedMembersInfo) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        phdMemberCache.del('single_phd_member');
        phdMemberCache.del('all_phd_member');
        dashboardCache.del('aggregated_data');
        return res.status(200).json({
          details: 'Requested resources has been successfully removed!',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to delete requested resources due to some technical problem.',
    });
  }
};
module.exports = deletePhdMemberCtrl;
