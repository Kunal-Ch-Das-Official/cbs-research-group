// Content: Delete Specific  Masters Alumni Info By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to delete single masters alumni data by client request .

const cloudinaryConfig = require("../../../config/cloudinaryConfig");
const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");

const deleteMastersAlumniCtrl = async (req, res) => {
  let id = req.params.id;
  try {
    const currentMastersAlumni = await mastersAlumniModel.findById(id);
    if (!currentMastersAlumni) {
      res.status(404).json({
        error: "Requested resources are not found!!",
        message: "Please check the details and try again.",
      });
    } else {
      const currentAlumniImgsCloudId =
        currentMastersAlumni.profilePicturePublicId;
      await cloudinaryConfig.uploader
        .destroy(currentAlumniImgsCloudId)
        .then(() => {
          console.log({
            status: 200,
            message:
              "Current alumni images has been successfully removed from cloudinary!!",
          });
        });

      const removeAlumniFromDb = await mastersAlumniModel.findByIdAndDelete(id);
      if (!removeAlumniFromDb) {
        res.status(406).json({
          message: "Your applications are not acceptable, try again later!",
        });
      } else {
        res.status(200).json({
          message:
            "The requested alumni resources has been successfully removed!",
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
module.exports = deleteMastersAlumniCtrl;
