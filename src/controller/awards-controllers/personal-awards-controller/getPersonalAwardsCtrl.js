// Content: Get All Personal Awards Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send all personal awards info to the client by request of users.

const personalAwardsModel = require("../../../models/awards-model/personal-awards-model/personalAwardsModel");

const getPersonalAwardsCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getRequestedPersonalAward = await personalAwardsModel.findById(id);
      if (!getRequestedPersonalAward) {
        res.status(404).json({
          error: "Requested personal awards are not found!",
          message: "Please check the details!",
        });
      } else {
        res.status(200).json(getRequestedPersonalAward);
      }
    } catch (error) {
      console.log(
        "Unable to get requested personal awards due to internal server error",
        error
      );
      res.status(500).json({
        Error: error.message,
        Message:
          "Unable to get personal awards news due to some technical error",
      });
    }
  } else {
    try {
      const getAllPersonalAwards = await personalAwardsModel.find();
      if (!getAllPersonalAwards) {
        return res.status(404).json({
          error: "Requested personal awards are not available!",
          message: "Upload a award details first!",
        });
      } else {
        return res.status(200).json(getAllPersonalAwards);
      }
    } catch (error) {
      console.log(
        "Unable to get personal awards due to internal server error",
        error
      );
      return res.status(500).json({
        Error: error.message,
        Message:
          "Unable to get the personal awards due to some technical error!",
      });
    }
  }
};
module.exports = getPersonalAwardsCtrl;
