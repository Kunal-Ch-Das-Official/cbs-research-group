/**
 * Get Personal Awards Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles the process of retrieving and sending all personal
 * awards information to the client based on user requests. It provides a
 * comprehensive view of all personal awards data as requested.
 *
 * Functionality:
 * - Receives and processes requests to retrieve personal awards information.
 * - Queries the database to gather all relevant personal awards data.
 * - Sends the collected personal awards data to the client.
 * - Provides appropriate responses for successful and failed data retrieval.
 *
 * Usage:
 * Use this controller to manage client requests for retrieving and viewing
 * personal awards information. It ensures that clients receive accurate and
 * complete data regarding personal awards.
 */

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
        res.status(200).sendCachedData(getRequestedPersonalAward);
      }
    } catch (error) {
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
        return res.status(200).sendCachedData(getAllPersonalAwards);
      }
    } catch (error) {
      return res.status(500).json({
        Error: error.message,
        Message:
          "Unable to get the personal awards due to some technical error!",
      });
    }
  }
};
module.exports = getPersonalAwardsCtrl;
