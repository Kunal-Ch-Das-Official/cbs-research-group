// Content: Delete Specific Team Awards By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to delete team awards news by client request .

const teamAwardsModel = require("../../../models/awards-model/team-awards-model/teamAwardsModel");

const deleteTeamAwardCtrl = async (req, res) => {
  const id = req.params.id;
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