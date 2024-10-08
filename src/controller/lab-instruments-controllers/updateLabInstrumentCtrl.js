/**
 * Lab Instruments Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 * Last update: 08/10/2024
 * Description:
 * This controller is responsible for updating existing lab instrument information in
 * the database. It handles requests to modify data related to lab instruments, ensuring
 * that the database remains current with the latest information.
 *
 * Functionality:
 * - Receives update requests for lab instrument data from the client.
 * - Validates the incoming data to ensure it meets required criteria.
 * - Updates the relevant lab instrument records in the database with the new information.
 * - Handles errors and provides appropriate feedback if the update process fails.
 *
 * Usage:
 * Utilize this controller to modify or correct details of lab instruments as needed.
 * It is essential for maintaining the accuracy and relevance of lab instrument data
 * in the database, which supports effective data management and reporting.
 */

const labInstrumentModel = require('../../models/lab-instruments-model/labInstrumentModel');
const customSingleDestroyer = require('../../utils/cloudinary-single-destroyer/customSingleDestroyer');
const customSingleUploader = require('../../utils/cloudinary-single-uploader/customSingleUploader');
const { dashboardCache } = require('../dashboard-controllers/getAllData');
const { labInstrumentCache } = require('./getLabInstrumentsCtrl');

const updateLabInstrumentCtrl = async (req, res) => {
  const { id } = req.params;
  const { instrumentName, description } = req.body;
  const filePath = req.file ? req.file.buffer : null;
  let newInstrumentImage, newInstrumentImgCloudId;

  try {
    const getPreviousInstrumentInfo = await labInstrumentModel.findById(id);
    if (!getPreviousInstrumentInfo) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    }

    const newInstrumentName =
      instrumentName || getPreviousInstrumentInfo.instrumentName;

    const newInstrumentDescription =
      description || getPreviousInstrumentInfo.description;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, 'lab_instruments_image');
      newInstrumentImage = storedDataAccessUrl;
      newInstrumentImgCloudId = storedDataAccessId;

      const { instrumentImagePublicId } = getPreviousInstrumentInfo;
      instrumentImagePublicId &&
        (await customSingleDestroyer(instrumentImagePublicId));
    } else {
      newInstrumentImage = getPreviousInstrumentInfo.instrumentImage;
      newInstrumentImgCloudId =
        getPreviousInstrumentInfo.instrumentImagePublicId;
    }

    const updatedInstrumentInfo = {
      instrumentName: newInstrumentName,
      instrumentImage: newInstrumentImage,
      instrumentImagePublicId: newInstrumentImgCloudId,
      description: newInstrumentDescription,
    };

    const updateInstrumentInfo = await labInstrumentModel.findByIdAndUpdate(
      id,
      updatedInstrumentInfo,
      { new: true }
    );

    if (!updateInstrumentInfo) {
      return res.status(501).json({
        issue: 'Not implemented!',
        details: 'Something went wrong, please try again later.',
      });
    } else {
      labInstrumentCache.del('single_lab_instrument');
      labInstrumentCache.del('all_lab_instrument');
      dashboardCache.del('aggregated_data');
      return res.status(200).json({
        details: 'Requested resources has been successfully updated!',
      });
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to update requested resources due to some technical problem.',
    });
  }
};

module.exports = updateLabInstrumentCtrl;
