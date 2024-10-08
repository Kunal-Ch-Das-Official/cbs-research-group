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

const labInstrumentModel = require('../../models/lab-instruments-model/labInstrumentModel');
const customSingleDestroyer = require('../../utils/cloudinary-single-destroyer/customSingleDestroyer');

const deleteLabInstrumentCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequestedLabInstrumentInfo = await labInstrumentModel.findById(id);
    const { instrumentImagePublicId } = getRequestedLabInstrumentInfo;

    if (!getRequestedLabInstrumentInfo) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      instrumentImagePublicId &&
        (await customSingleDestroyer(instrumentImagePublicId));
      const deleteRequestedInstrumentInfo =
        await labInstrumentModel.findByIdAndDelete(id);
      if (!deleteRequestedInstrumentInfo) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        return res.status(200).json({
          details: 'Requested resources has been successfully removed!',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to delete requested resources due to some technical problem.',
    });
  }
};
module.exports = deleteLabInstrumentCtrl;
