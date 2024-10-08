/**
 * Delete Specific Team Awards By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 * Last update: 08/10/2024
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

const teamAwardsModel = require('../../../models/awards-model/team-awards-model/teamAwardsModel');
const { dashboardCache } = require('../../dashboard-controllers/getAllData');
const { teamAwardCache } = require('./getTeamAwardsCtrl');

const deleteTeamAwardCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getPreviousTeamAward = teamAwardsModel.findById(id);
    if (!getPreviousTeamAward) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      const deleteTeamAward = await teamAwardsModel.findByIdAndDelete(id);
      if (!deleteTeamAward) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        teamAwardCache.del('single_team_award');
        teamAwardCache.del('all_team_award');
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
module.exports = deleteTeamAwardCtrl;
