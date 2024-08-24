/**
 * Get Doctorate Alumni Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles the process of retrieving and sending all records
 * of doctorate alumni to the client upon request. It manages the retrieval
 * of comprehensive alumni data.
 *
 * Functionality:
 * - Receives and processes requests for retrieving all doctorate alumni
 *   information from the client.
 * - Retrieves the complete set of doctorate alumni records from the database.
 * - Sends the retrieved data to the client in response to their request.
 * - Handles errors and provides appropriate feedback if the data retrieval
 *   fails.
 *
 * Usage:
 * Use this controller to manage client requests for accessing all records
 * of doctorate alumni. It ensures that the complete and accurate data is
 * provided to clients as requested.
 */

const doctorateAlumniModel = require("../../../models/alumni-model/doctorate-alumni-model/doctorateAlumniModel");

const getDoctorateAlumniCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getSingleAlumniInfo = await doctorateAlumniModel.findById(id);
      if (!getSingleAlumniInfo) {
        return res.status(404).json({
          error: "Requested resources are not found!",
          message: "Please check the detail once again.",
        });
      } else {
        return res.status(200).sendCachedData(getSingleAlumniInfo);
      }
    } catch (error) {
      return res.status(500).json({
        Message: "Unable to find the resources due to some technical error",
        Error: error.message,
      });
    }
  } else {
    try {
      const getAllDoctorateAlumniInfo = await doctorateAlumniModel.find();
      if (!getAllDoctorateAlumniInfo) {
        return res.status(404).json({
          error: "Requested resources are not found!",
          message: "Please check the url and try it again",
        });
      } else {
        return res.status(200).sendCachedData(getAllDoctorateAlumniInfo);
      }
    } catch (error) {
      return res.status(500).json({
        Message: "Unable to find the resources due to some technical error",
        Error: error.message,
      });
    }
  }
};
module.exports = getDoctorateAlumniCtrl;
