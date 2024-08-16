// Content: Get All Master Alumni Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send all masters alumni data to the client by request of users.

const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");

const getMastersAlumniCtrl = async (req, res) => {
  try {
    const getAllMastersAlumniInfo = await mastersAlumniModel.find();
    if (!getAllMastersAlumniInfo) {
      res.status(404).json({
        error: "Masters alumni are not available!",
      });
    } else {
      res.status(200).json(getAllMastersAlumniInfo);
    }
  } catch (error) {
    console.log(
      "Unable to find masters alumni info due to some technical error:",
      error
    );
    res.status(500).json({
      message: "Unable to find masters alumni info due to some technical error",
      reason: error.message,
    });
  }
};

module.exports = getMastersAlumniCtrl;
