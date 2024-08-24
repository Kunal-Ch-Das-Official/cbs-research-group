/**
 * Get All Master Alumni Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles the process of retrieving and sending all records
 * of master alumni to the client upon request. It manages the provision of
 * comprehensive alumni data.
 *
 * Functionality:
 * - Receives and processes requests for retrieving all master alumni
 *   information from the client.
 * - Retrieves the complete set of master alumni records from the database.
 * - Sends the retrieved data to the client in response to their request.
 * - Handles errors and provides appropriate feedback if the data retrieval
 *   fails.
 *
 * Usage:
 * Use this controller to manage client requests for accessing all records
 * of master alumni. It ensures that the complete and accurate data is
 * provided to clients as requested.
 */

const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");

const getMastersAlumniCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getSingleMastersAlumniInfo = await mastersAlumniModel.findById(id);
      if (!getSingleMastersAlumniInfo) {
        return res.status(404).json({
          error: "Masters alumni are not found please check the details!",
        });
      } else {
        return res.status(200).sendCachedData(getSingleMastersAlumniInfo);
      }
    } catch (error) {
      return res.status(500).sendCachedData({
        message:
          "Unable to find masters alumni info due to some technical error",
        reason: error.message,
      });
    }
  } else {
    try {
      const getAllMastersAlumniInfo = await mastersAlumniModel.find();
      if (!getAllMastersAlumniInfo) {
        return res.status(404).json({
          error: "Masters alumni are not available!",
        });
      } else {
        return res.status(200).json(getAllMastersAlumniInfo);
      }
    } catch (error) {
      return res.status(500).json({
        message:
          "Unable to find masters alumni info due to some technical error",
        reason: error.message,
      });
    }
  }
};

module.exports = getMastersAlumniCtrl;
