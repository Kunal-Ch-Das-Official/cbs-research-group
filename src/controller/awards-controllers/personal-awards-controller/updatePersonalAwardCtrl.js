// Content: Personal Awards Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to update existing personal awards to the data base.

const personalAwardsModel = require("../../../models/awards-model/personal-awards-model/personalAwardsModel");

const updatePersonalAwardCtrl = async (req, res) => {
  const { id } = req.params;
  const { awardTitle, recivedFor, recivedDate } = req.body;
  try {
    const getPreviousPersonalAward = await personalAwardsModel.findById(id);
    if (!getPreviousPersonalAward) {
      return res.status(404).json({
        error: "Requested personal awards are not found!",
        message: "Please check the details",
      });
    } else {
      const newAwardTitle = awardTitle || getPreviousPersonalAward.awardTitle;
      const newAwardRecivedFor =
        recivedFor || getPreviousPersonalAward.recivedFor;
      const newAwardRecivedDate =
        recivedDate || getPreviousPersonalAward.recivedDate;

      const updatedPersonalAwards = {
        awardTitle: newAwardTitle,
        recivedFor: newAwardRecivedFor,
        recivedDate: newAwardRecivedDate,
      };

      const updateDetails = await personalAwardsModel.findByIdAndUpdate(
        id,
        updatedPersonalAwards,
        { new: true }
      );

      if (!updateDetails) {
        return res
          .status(422)
          .json({ error: "Failed to save award due to validation errors." });
      } else {
        return res.status(200).json({
          message: "Requested personal awards has been successfully updated!",
        });
      }
    }
  } catch (error) {
    console.log(
      "Unable to update personal award due to some internal server error!",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to update personal awards due to some technical error!",
    });
  }
};
module.exports = updatePersonalAwardCtrl;
