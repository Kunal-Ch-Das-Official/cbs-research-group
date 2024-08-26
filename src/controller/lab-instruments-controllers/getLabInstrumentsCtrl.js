/**
 * Get Access of Lab Instruments Info From Client Side Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles requests to retrieve and send all lab instrument data to
 * the client side. It is designed to provide users with comprehensive information
 * about lab instruments as requested.
 *
 * Functionality:
 * - Receives requests from the client to access lab instrument information.
 * - Fetches all relevant lab instrument data from the database.
 * - Sends the retrieved data to the client in a structured format.
 * - Ensures data accuracy and handles any errors that may occur during data retrieval.
 *
 * Usage:
 * Use this controller to provide clients with complete details of lab instruments,
 * enabling them to view or utilize this information as required. It is useful for
 * generating reports, displaying data on user interfaces, or any other client-side
 * applications that need access to lab instrument data.
 */

const labInstrumentModel = require("../../models/lab-instruments-model/labInstrumentModel");

const getLabInstrumentsCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getSingleInstrumentInfo = await labInstrumentModel.findById(id);
      if (!getSingleInstrumentInfo) {
        return res.status(404).json({
          issue: "Not found!",
          details: "Requested resources are not found.",
        });
      } else {
        return res.status(200).sendCachedData(getSingleInstrumentInfo);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          "Unable to find requested resources due to some technical problem.",
      });
    }
  } else {
    try {
      const getAllInstrumentsInfo = await labInstrumentModel.find();
      if (!getAllInstrumentsInfo) {
        return res.status(404).json({
          issue: "Not found!",
          details: "Requested resources are not found.",
        });
      } else {
        return res.status(200).sendCachedData(getAllInstrumentsInfo);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          "Unable to find requested resources due to some technical problem.",
      });
    }
  }
};
module.exports = getLabInstrumentsCtrl;
