/**
 * Get Team Awards Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 * Last update: 08/10/2024
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

const teamAwardsModel = require('../../../models/awards-model/team-awards-model/teamAwardsModel');
const NodeCache = require('node-cache');
const teamAwardCache = new NodeCache();

const getTeamAwardsCtrl = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      // Check if team award is in cache
      const cachedSingleTeamAward = teamAwardCache.get('single_team_award');
      if (cachedSingleTeamAward) {
        return res.status(200).json(cachedSingleTeamAward);
      } else {
        const getRequestedTeamAward = await teamAwardsModel.findById(id);
        if (!getRequestedTeamAward) {
          return res.status(404).json({
            issue: 'Not found!',
            details: 'Requested resources are not found.',
          });
        } else {
          // Cache the retrieved team award
          teamAwardCache.set('single_team_award', getRequestedTeamAward);
          return res.status(200).json(getRequestedTeamAward);
        }
      }
    } else {
      // Check if team award is in cache
      const allCachedTeamAward = teamAwardCache.get('all_team_award');
      if (allCachedTeamAward) {
        return res.status(200).json(allCachedTeamAward);
      } else {
        const getAllTeamAwards = await teamAwardsModel.find();
        if (!getAllTeamAwards) {
          return res.status(404).json({
            issue: 'Not found!',
            details: 'Requested resources are not found.',
          });
        } else {
          // Cache the retrieved team award
          teamAwardCache.set('all_team_award', getAllTeamAwards);
          return res.status(200).json(getAllTeamAwards);
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to find requested resources due to some technical problem.',
    });
  }
};
module.exports = { getTeamAwardsCtrl, teamAwardCache };
