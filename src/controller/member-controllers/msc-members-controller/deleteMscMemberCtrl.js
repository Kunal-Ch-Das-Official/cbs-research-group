/**
 * Delete Specific MSC Members Info By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 * Last update: 08/10/2024
 * Description:
 * This controller handles the deletion of a specific MSC member's data from the
 * database based on a client request. It ensures that the correct record is
 * removed in response to a valid deletion request.
 *
 * Functionality:
 * - Receives a delete request for a specific MSC member from the client.
 * - Validates the request to ensure it contains the necessary identification
 *   information for the MSC member.
 * - Removes the specified MSC member's record from the database.
 * - Handles any errors that occur during the deletion process and provides feedback.
 *
 * Usage:
 * Use this controller to delete individual MSC members' records from the database.
 * This is essential for maintaining accurate and up-to-date information in response
 * to client requests for data removal.
 */

const mscMemberModel = require('../../../models/members-model/msc-member-model/mscMemberModel');
const customSingleDestroyer = require('../../../utils/cloudinary-single-destroyer/customSingleDestroyer');
const { dashboardCache } = require('../../dashboard-controllers/getAllData');
const { mscMemberCache } = require('./getMscMembersCtrl');

const deleteMscMemberCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequestedMembersInfo = await mscMemberModel.findById(id);
    const { profilePicturePublicId } = getRequestedMembersInfo;
    if (!profilePicturePublicId) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      profilePicturePublicId &&
        (await customSingleDestroyer(profilePicturePublicId));
      const deleteRequestedMembersInfo = await mscMemberModel.findByIdAndDelete(
        id
      );
      if (!deleteRequestedMembersInfo) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        mscMemberCache.del('single_msc_member');
        mscMemberCache.del('all_msc_member');
        dashboardCache.del('aggregated_data');
        return res.status(200).json({
          details: 'Requested resources has been successfully deleted!',
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
module.exports = deleteMscMemberCtrl;
