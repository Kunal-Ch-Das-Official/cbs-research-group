// Content: Delete Specific  Doctorate Alumni Info By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to delete single doctorate alumni data by client request .

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const doctorateAlumniModel = require("../../../models/alumni-model/doctorate-alumni-model/doctorateAlumniModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");

const deleteDoctorateAlumniCtrl = async (req, res) => {
  let { id } = req.params;
  try {
    const currentDoctorateAlumni = await doctorateAlumniModel.findById(id);
    if (!currentDoctorateAlumni) {
      return res.status(404).json({
        error: "Requested resources are not found!!",
        message: "Please check the details and try again.",
      });
    } else {
      const currentAlumniImgsCloudId =
        currentDoctorateAlumni.profilePicturePublicId;
      currentAlumniImgsCloudId &&
        (await customSingleDestroyer(currentAlumniImgsCloudId));

      const removeAlumniFromDb = await doctorateAlumniModel.findByIdAndDelete(
        id
      );
      if (!removeAlumniFromDb) {
        return res.status(406).json({
          message: "Your applications are not acceptable, try again later!",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/doctorate/alumni-data/${id}`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/doctorate/alumni-data`
        );
        return res.status(200).json({
          message: "The requested resources has been successfully removed!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "Unable to remove requested resources due to some technical error!",
      Error: error.message,
    });
  }
};
module.exports = deleteDoctorateAlumniCtrl;
