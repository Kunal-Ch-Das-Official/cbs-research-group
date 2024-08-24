// Content: Team Awards Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to upload personal awards to the data base.

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
      console.log("Unable to upload due to internal server error!", error);
      return res.status(500).json({
        Error: error.message,
        Message:
          "Unable to upload awards information due to some technical error",
      });
    }
  }
};
module.exports = uploadTeamAwardCtrl;
