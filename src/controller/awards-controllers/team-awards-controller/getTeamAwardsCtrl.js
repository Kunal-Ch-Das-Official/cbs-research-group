/**
 * Get Team Awards Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles requests to retrieve all team awards information
 * from the database and sends it to the client. It provides a complete list
 * of team awards as requested by users or administrators.
 *
 * Functionality:
 * - Receives and processes requests to retrieve all team awards data.
 * - Fetches the complete list of team awards records from the database.
 * - Sends the retrieved team awards information to the client.
 * - Provides appropriate responses for successful data retrieval or errors.
 *
 * Usage:
 * Use this controller to manage requests for retrieving all team awards data
 * from the database. It ensures that users receive the complete set of
 * team awards information as requested.
 */

const teamAwardsModel = require("../../../models/awards-model/team-awards-model/teamAwardsModel");

const getTeamAwardsCtrl = async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const getRequestedTeamAward = await teamAwardsModel.findById(id);
      if (!getRequestedTeamAward) {
        return res.status(404).json({
          issue: "Not found!",
          details: "Requested resources are not found.",
        });
      } else {
        return res.status(200).sendCachedData(getRequestedTeamAward);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          "Unable to find requested resources due to some technical problem.",
      });
    }
  } else {
    try {
      const getAllTeamAwards = await teamAwardsModel.find();
      if (!getAllTeamAwards) {
        return res.status(404).json({
          issue: "Not found!",
          details: "Requested resources are not found.",
        });
      } else {
        return res.status(200).sendCachedData(getAllTeamAwards);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          "Unable to find requested resources due to some technical problem.",
      });
    }
  }
};
module.exports = getTeamAwardsCtrl;
