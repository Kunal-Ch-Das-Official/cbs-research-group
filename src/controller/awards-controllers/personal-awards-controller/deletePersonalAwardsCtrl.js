/**
 * Delete Specific Personal Awards By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles the process of deleting specific personal awards
 * records from the database based on client requests. It manages the removal
 * of award data as requested by clients or administrators.
 *
 * Functionality:
 * - Receives and processes requests to delete specific personal awards.
 * - Validates the request to ensure that the specified award exists.
 * - Deletes the targeted personal awards record from the database.
 * - Provides appropriate responses for successful and failed delete operations.
 *
 * Usage:
 * Use this controller to handle client requests for deleting individual
 * personal awards records. It ensures that personal awards data can be
 * accurately removed from the system as needed.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const personalAwardsModel = require("../../../models/awards-model/personal-awards-model/personalAwardsModel");

const deletePersonalAwardsCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getPreviousPersonalAward = personalAwardsModel.findById(id);
    if (!getPreviousPersonalAward) {
      return res.status(404).json({
        error: "Requested personal awards are not found!",
        message: "please check the details",
      });
    } else {
      const deletePersonalAward = await personalAwardsModel.findByIdAndDelete(
        id
      );
      if (!deletePersonalAward) {
        return res
          .status(422)
          .json({ error: "Failed to save award due to validation errors." });
      } else {
        clearCache(
          "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal/awards"
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal/awards/${id}`
        );
        return res.status(200).json({
          message: "Requested personal awards has been successfully removed!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
      Message:
        "Unable to delete requested personal award due to some technical error!",
    });
  }
};
module.exports = deletePersonalAwardsCtrl;
