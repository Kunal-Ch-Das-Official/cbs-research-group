// Content: Get Single Master Alumni Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send individual masters alumni data to the client by request of user.

const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");

const getSingleMastersAlumniCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleMastersAlumniInfo = await mastersAlumniModel.findById(id);
    if (!getSingleMastersAlumniInfo) {
      res.status(404).json({
        error: "Masters alumni are not found please check the details!",
      });
    } else {
      res.status(200).json(getSingleMastersAlumniInfo);
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

module.exports = getSingleMastersAlumniCtrl;
