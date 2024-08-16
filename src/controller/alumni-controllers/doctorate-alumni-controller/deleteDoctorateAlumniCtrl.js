// Content: Delete Specific  Doctorate Alumni Info By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to delete single doctorate alumni data by client request .

const cloudinaryConfig = require("../../../config/cloudinaryConfig");
const doctorateAlumniModel = require("../../../models/alumni-model/doctorate-alumni-model/doctorateAlumniModel");

const deleteDoctorateAlumniCtrl = async (req, res) => {
  let id = req.params.id;
  try {
    const currentDoctorateAlumni = await doctorateAlumniModel.findById(id);
    if (!currentDoctorateAlumni) {
      res.status(404).json({
        error: "Requested resources are not found!!",
        message: "Please check the details and try again.",
      });
    } else {
      const currentAlumniImgsCloudId =
        currentDoctorateAlumni.profilePicturePublicId;
      await cloudinaryConfig.uploader
        .destroy(currentAlumniImgsCloudId)
        .then(() => {
          console.log({
            status: 200,
            message:
              "Current alumni images has been successfully removed from cloudinary!!",
          });
        });

      const removeAlumniFromDb = await doctorateAlumniModel.findByIdAndDelete(
        id
      );
      if (!removeAlumniFromDb) {
        res.status(406).json({
          message: "Your applications are not acceptable, try again later!",
        });
      } else {
        res.status(200).json({
          message: "The requested resources has been successfully removed!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Unable to remove requested resources due to some technical error!",
      Error: error.message,
    });
  }
};
module.exports = deleteDoctorateAlumniCtrl;
