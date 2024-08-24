/**
 * Delete Specific Lab Instrument Info By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
 * Description:
 * This controller handles the deletion of a specific lab instrument entry from the database
 * based on a request from the client.
 *
 * Functionality:
 * - Receives requests to delete a specific lab instrument record.
 * - Validates the request to ensure it contains the necessary identification details.
 * - Deletes the specified lab instrument entry from the database.
 * - Handles any errors that may occur during the deletion process.
 *
 * Usage:
 * Use this controller to remove individual lab instrument records from the database
 * as requested by clients. It ensures that outdated or incorrect data can be efficiently
 * managed and removed as needed.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const labInstrumentModel = require("../../models/lab-instruments-model/labInstrumentModel");
const customSingleDestroyer = require("../../utils/cloudinary-single-destroyer/customSingleDestroyer");

const deleteLabInstrumentCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequestedLabInstrumentInfo = await labInstrumentModel.findById(id);
    const { instrumentImagePublicId } = getRequestedLabInstrumentInfo;

    if (!getRequestedLabInstrumentInfo) {
      return res.status(404).json({
        error: "Requested resources are not found!",
        message: "Please check the given details.",
      });
    } else {
      instrumentImagePublicId &&
        (await customSingleDestroyer(instrumentImagePublicId));
      const deleteRequestedInstrumentInfo =
        await labInstrumentModel.findByIdAndDelete(id);
      if (!deleteRequestedInstrumentInfo) {
        return res.status(406).json({
          message: "Your applications are not acceptable, try again later!",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/facilities/lab-instruments`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/facilities/lab-instruments/${id}`
        );
        return res.status(200).json({
          message: "Requested resources has been successfully deleted!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error,
      Message: `Unable to remove phd members info due to:${error.message}`,
    });
  }
};
module.exports = deleteLabInstrumentCtrl;
