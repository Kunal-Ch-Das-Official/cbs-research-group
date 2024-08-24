// Content: Team Awards Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to update existing team awards to the data base.

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
    console.log(
      "Unable to update teams award due to some internal server error!",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to update teams awards due to some technical error!",
    });
  }
};
module.exports = updateTeamAwardCtrl;
