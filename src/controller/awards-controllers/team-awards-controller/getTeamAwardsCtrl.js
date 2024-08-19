// Content: Get All Team Awards Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send all team awards info to the client by request of users.

const teamAwardsModel = require("../../../models/awards-model/team-awards-model/teamAwardsModel");

const getTeamAwardsCtrl = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const getRequestedTeamAward = await teamAwardsModel.findById(id);
      if (!getRequestedTeamAward) {
        res.status(404).json({
          error: "Requested team awards are not found!",
          message: "Please check the details!",
        });
      } else {
        res.status(200).json(getRequestedTeamAward);
      }
    } catch (error) {
      console.log(
        "Unable to get requested team awards due to internal server error",
        error
      );
      res.status(500).json({
        Error: error.message,
        Message: "Unable to get team awards news due to some technical error",
      });
    }
  } else {
    try {
      const getAllTeamAwards = await teamAwardsModel.find();
      if (!getAllTeamAwards) {
        return res.status(404).json({
          error: "Requested team awards are not available!",
          message: "Upload a award details first!",
        });
      } else {
        return res.status(200).json(getAllTeamAwards);
      }
    } catch (error) {
      console.log(
        "Unable to get team awards due to internal server error",
        error
      );
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to get the team awards due to some technical error!",
      });
    }
  }
};
module.exports = getTeamAwardsCtrl;
