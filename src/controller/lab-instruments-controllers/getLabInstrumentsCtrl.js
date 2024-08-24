// Content: (Get Access of Lab Instruments Info From Client Side) Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to send all lab instrument data to the client side by request of users.

const labInstrumentModel = require("../../models/lab-instruments-model/labInstrumentModel");

const getLabInstrumentsCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getSingleInstrumentInfo = await labInstrumentModel.findById(id);
      if (!getSingleInstrumentInfo) {
        return res.status(404).json({
          error: "Requested resources are not found!",
          message: "Please check the given details.",
        });
      } else {
        return res.status(200).sendCachedData(getSingleInstrumentInfo);
      }
    } catch (error) {
      console.log("There is some technical error occared!", error);
      return res.status(500).json({
        Error: error.message,
        Message: `Unable to find phd member info due to:${error.message}`,
      });
    }
  } else {
    try {
      const getAllInstrumentsInfo = await labInstrumentModel.find();
      if (!getAllInstrumentsInfo) {
        return res.status(404).json({
          message: "Requested resources are not available!",
        });
      } else {
        return res.status(200).sendCachedData(getAllInstrumentsInfo);
      }
    } catch (error) {
      console.log("There is some technical error occared!", error);
      return res.status(500).json({
        Error: error.message,
        Message: `Unable to find phd members info due to:${error.message}`,
      });
    }
  }
};
module.exports = getLabInstrumentsCtrl;
