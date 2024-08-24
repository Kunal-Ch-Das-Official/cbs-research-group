/**
 * Team Awards Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles the process of updating existing team awards
 * records in the database. It allows for modifications to be made to
 * team awards information based on client requests or administrative
 * updates.
 *
 * Functionality:
 * - Receives and processes update requests for team awards.
 * - Validates the provided data to ensure it meets the required format.
 * - Updates the specified team awards record(s) in the database.
 * - Provides appropriate responses for successful updates or errors.
 *
 * Usage:
 * Use this controller to manage the updating of team awards records
 * in the database. It ensures that team awards information is kept
 * current and accurate based on client or administrative updates.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const teamAwardsModel = require("../../../models/awards-model/team-awards-model/teamAwardsModel");

const updateTeamAwardCtrl = async (req, res) => {
  const { id } = req.params;
  const { awardTitle, recivedFor, recivedDate } = req.body;
  try {
    const getPreviousTeamAward = await teamAwardsModel.findById(id);
    if (!getPreviousTeamAward) {
      return res.status(404).json({
        error: "Requested personal awards are not found!",
        message: "Please check the details",
      });
    } else {
      const newAwardTitle = awardTitle || getPreviousTeamAward.awardTitle;
      const newAwardRecivedFor = recivedFor || getPreviousTeamAward.recivedFor;
      const newAwardRecivedDate =
        recivedDate || getPreviousTeamAward.recivedDate;

      const updatedTeamAwards = {
        awardTitle: newAwardTitle,
        recivedFor: newAwardRecivedFor,
        recivedDate: newAwardRecivedDate,
      };

      const updateDetails = await teamAwardsModel.findByIdAndUpdate(
        id,
        updatedTeamAwards,
        { new: true }
      );

      if (!updateDetails) {
        return res
          .status(422)
          .json({ error: "Failed to save award due to validation errors." });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/team/awards/${id}`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/team/awards`
        );
        return res.status(200).json({
          message: "Requested teams awards has been successfully updated!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to update teams awards due to some technical error!",
    });
  }
};
module.exports = updateTeamAwardCtrl;
