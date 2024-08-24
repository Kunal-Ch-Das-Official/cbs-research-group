/**
 * Team Awards Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles the uploading of new team awards records
 * to the database. It is responsible for adding new entries for
 * team awards based on client or administrative input.
 *
 * Functionality:
 * - Receives and processes requests to upload team awards information.
 * - Validates and sanitizes the data provided to ensure correctness.
 * - Inserts new team awards records into the database.
 * - Provides appropriate responses for successful uploads or errors.
 *
 * Usage:
 * Use this controller to add new team awards records to the database.
 * It ensures that team awards information is properly uploaded and
 * stored for future reference and use.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const teamAwardsModel = require("../../../models/awards-model/team-awards-model/teamAwardsModel");

const uploadTeamAwardCtrl = async (req, res) => {
  const { awardTitle, recivedFor, recivedDate } = req.body;
  if (!req.body) {
    return res.status(400).json({
      error: "Bad Request!",
      message: "Please fill up all the fields carefully",
    });
  } else {
    try {
      const teamAward = new teamAwardsModel({
        awardTitle,
        recivedFor,
        recivedDate,
      });
      const uploadDetails = teamAward.save();
      if (!uploadDetails) {
        return res
          .status(422)
          .json({ error: "Failed to save award due to validation errors." });
      } else {
        clearCache(
          "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/team/awards"
        );
        return res.status(201).json({
          message: "Award information has been successfully uploaded!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        Error: error.message,
        Message:
          "Unable to upload awards information due to some technical error",
      });
    }
  }
};
module.exports = uploadTeamAwardCtrl;
