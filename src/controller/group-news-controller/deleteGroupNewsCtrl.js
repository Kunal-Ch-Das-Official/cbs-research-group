/**
 * Delete Specific Group News By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This controller handles the process of deleting a specific group news entry
 * based on a request from a client.
 *
 * Functionality:
 * - Receives requests to delete group news entries.
 * - Validates the request to ensure it includes necessary information (e.g., news ID).
 * - Deletes the specified group news entry from the database.
 * - Handles errors and ensures the integrity of the database after the deletion.
 *
 * Usage:
 * Use this controller to manage the removal of specific group news items
 * as requested by clients. It ensures that the group's news content can
 * be updated or removed as needed.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const groupNewsModel = require("../../models/group-news-model/groupNewsModel");

const deleteGroupNewsCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getPrevGroupNews = await groupNewsModel.findById(id);
    if (!getPrevGroupNews) {
      return res.status(404).json({
        error: "Requested group news are not found!",
        message: "Please check the details.",
      });
    } else {
      const deleteReqGroupNews = await groupNewsModel.findByIdAndDelete(id);
      if (!deleteReqGroupNews) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try after some time.",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/latest-news/groups`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/latest-news/groups/${id}`
        );
        return res.status(200).json({
          message: "Requested group news has been successfully removed!",
        });
      }
    }
  } catch (error) {
    console.log(
      "Unable to delete group news due to internal server error.",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to delete group news due to some technical error.",
    });
  }
};
module.exports = deleteGroupNewsCtrl;
