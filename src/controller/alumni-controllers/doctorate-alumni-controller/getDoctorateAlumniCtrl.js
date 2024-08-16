// Content: Get All Doctorate Alumni Info From Client, Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send all doctorate alumni data to the client by request of users.

const doctorateAlumniModel = require("../../../models/alumni-model/doctorate-alumni-model/doctorateAlumniModel");

const getDoctorateAlumniCtrl = async (req, res) => {
  try {
    const getAllDoctorateAlumniInfo = await doctorateAlumniModel.find();
    if (!getAllDoctorateAlumniInfo) {
      res.status(404).json({
        error: "Requested resources are not found!",
        message: "Please check the url and try it again",
      });
    } else {
      res.status(200).json(getAllDoctorateAlumniInfo);
    }
  } catch (error) {
    console.log(`Unable to get the resources due to:${error}`);
    res.status(500).json({
      Message: "Unable to find the resources due to some technical error",
      Error: error.message,
    });
  }
};
module.exports = getDoctorateAlumniCtrl;
