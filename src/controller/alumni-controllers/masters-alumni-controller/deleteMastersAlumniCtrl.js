/**
 * Delete Specific Masters Alumni Info By Admin Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 * Last update: 08/10/2024
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

const mastersAlumniModel = require('../../../models/alumni-model/masters-alumni-model/mastersAlumniModel');
const customSingleDestroyer = require('../../../utils/cloudinary-single-destroyer/customSingleDestroyer');
const { dashboardCache } = require('../../dashboard-controllers/getAllData');
const { masterAlumniCache } = require('./getMastersAlumniCtrl');

const deleteMastersAlumniCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const currentMastersAlumni = await mastersAlumniModel.findById(id);
    if (!currentMastersAlumni) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      const { profilePicturePublicId } = currentMastersAlumni;

      profilePicturePublicId &&
        (await customSingleDestroyer(profilePicturePublicId));
      const removeAlumniFromDb = await mastersAlumniModel.findByIdAndDelete(id);
      if (!removeAlumniFromDb) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        masterAlumniCache.del('single_master_alumni');
        masterAlumniCache.del('all_master_alumni');
        dashboardCache.del('aggregated_data');
        return res.status(200).json({
          details: 'The requested resources has been successfully removed!',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to remove requested resources due to some technical problem.',
    });
  }
};
module.exports = deleteMastersAlumniCtrl;
