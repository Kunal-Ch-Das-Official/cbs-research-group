/**
 * Delete Specific Team Awards By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles the process of deleting specific team awards records
 * from the database based on client requests. It manages the removal of team
 * awards data as requested by users or administrators.
 *
 * Functionality:
 * - Receives and processes delete requests for specific team awards.
 * - Validates the request to ensure the specified team awards record exists.
 * - Deletes the specified team awards record from the database.
 * - Provides appropriate responses for successful and failed delete operations.
 *
 * Usage:
 * Use this controller to manage the deletion of specific team awards data
 * from the database. It ensures that team awards records are removed as
 * requested by clients.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const teamAwardsModel = require("../../../models/awards-model/team-awards-model/teamAwardsModel");

const deleteTeamAwardCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getPreviousTeamAward = teamAwardsModel.findById(id);
    if (!getPreviousTeamAward) {
      return res.status(404).json({
        error: "Requested team awards are not found!",
        message: "please check the details",
      });
    } else {
      const deleteTeamAward = await teamAwardsModel.findByIdAndDelete(id);
      if (!deleteTeamAward) {
        return res
          .status(422)
          .json({ error: "Failed to save award due to validation errors." });
      } else {
        clearCache(
          "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/team/awards"
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/team/awards/${id}`
        );
        return res.status(200).json({
          message: "Requested team awards has been successfully removed!",
        });
      }
    }
  } catch (error) {
    console.log(
      "Unable to delete team awards due to some internal server error",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message:
        "Unable to delete requested team awards due to some technical error!",
    });
  }
};
module.exports = deleteTeamAwardCtrl;
