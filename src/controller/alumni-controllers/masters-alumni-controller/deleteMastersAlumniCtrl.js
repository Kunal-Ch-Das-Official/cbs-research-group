/**
 * Delete Specific Masters Alumni Info By Admin Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles the deletion of specific records of masters
 * alumni based on admin requests. It manages the removal of individual
 * alumni data from the database as per admin instructions.
 *
 * Functionality:
 * - Receives and processes admin requests for deleting specific masters
 *   alumni information.
 * - Validates the request to ensure proper identification of the record
 *   to be deleted.
 * - Deletes the specified alumni data from the database.
 * - Provides appropriate responses for successful and failed deletion
 *   operations.
 *
 * Usage:
 * Use this controller to handle admin requests for deleting specific
 * records of masters alumni. It ensures that individual alumni data can
 * be accurately removed from the system as requested by admins.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");

const deleteMastersAlumniCtrl = async (req, res) => {
  let { id } = req.params;
  try {
    const currentMastersAlumni = await mastersAlumniModel.findById(id);
    if (!currentMastersAlumni) {
      return res.status(404).json({
        error: "Requested resources are not found!!",
        message: "Please check the details and try again.",
      });
    } else {
      const { profilePicturePublicId } = currentMastersAlumni;

      profilePicturePublicId &&
        (await customSingleDestroyer(profilePicturePublicId));
      const removeAlumniFromDb = await mastersAlumniModel.findByIdAndDelete(id);
      if (!removeAlumniFromDb) {
        return res.status(406).json({
          message: "Your applications are not acceptable, try again later!",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/masters/alumni-data/${id}`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/masters/alumni-data`
        );
        return res.status(200).json({
          message:
            "The requested alumni resources has been successfully removed!",
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
module.exports = deleteMastersAlumniCtrl;
