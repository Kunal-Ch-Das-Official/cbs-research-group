/**
 * Delete Specific PHD Members Info By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
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

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");

const deletePhdMemberCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequestedMembersInfo = await phdMemberModel.findById(id);
    const { profilePicturePublicId } = getRequestedMembersInfo;

    if (!getRequestedMembersInfo) {
      return res.status(404).json({
        error: "Requested resources are not found!",
        message: "Please check the given details.",
      });
    } else {
      profilePicturePublicId &&
        (await customSingleDestroyer(profilePicturePublicId));
      const deleteRequestedMembersInfo = await phdMemberModel.findByIdAndDelete(
        id
      );
      if (!deleteRequestedMembersInfo) {
        return res.status(406).json({
          message: "Your applications are not acceptable, try again later!",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/phd/members`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/phd/members/${id}`
        );
        return res.status(200).json({
          message: "Requested resources has been successfully deleted!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error,
      Message: `Unable to remove phd members info due to:${error.message}`,
    });
  }
};
module.exports = deletePhdMemberCtrl;
