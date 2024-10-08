/**
 * Master Alumni Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 * Last update: 08/10/2024
 * Description:
 * This controller handles the process of updating existing records of
 * master alumni in the database. It manages modifications to alumni data
 * based on client or admin requests.
 *
 * Functionality:
 * - Receives and processes requests to update existing master alumni
 *   information.
 * - Validates the incoming data to ensure it meets required formats and
 *   criteria.
 * - Updates the specified alumni records in the database with the new data.
 * - Provides appropriate responses for successful and failed update
 *   operations.
 *
 * Usage:
 * Use this controller to manage the updating of master alumni records
 * in the database. It ensures that existing alumni data can be accurately
 * modified as needed.
 */

const mastersAlumniModel = require('../../../models/alumni-model/masters-alumni-model/mastersAlumniModel');
const customSingleDestroyer = require('../../../utils/cloudinary-single-destroyer/customSingleDestroyer');
const customSingleUploader = require('../../../utils/cloudinary-single-uploader/customSingleUploader');
const { dashboardCache } = require('../../dashboard-controllers/getAllData');
const { masterAlumniCache } = require('./getMastersAlumniCtrl');

const updateMastersAlumniCtrl = async (req, res) => {
  const { id } = req.params;
  const {
    alumniName,
    emailId,
    phoneNumber,
    bscDoneFrom,
    researchGateId,
    googleScholarId,
    yearOfPassout,
    details,
  } = req.body;
  const filePath = req.file ? req.file.buffer : null;
  let newAlumniImage, newCloudPublicId;

  try {
    const getPreviousAlumniInfo = await mastersAlumniModel.findById(id);
    if (!getPreviousAlumniInfo) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources not found.',
      });
    }

    const newAlumniName = alumniName || getPreviousAlumniInfo.alumniName;
    const newEmailId = emailId || getPreviousAlumniInfo.emailId;
    const newPhoneNumber = phoneNumber || getPreviousAlumniInfo.phoneNumber;
    const newBscDoneFrom = bscDoneFrom || getPreviousAlumniInfo.bscDoneFrom;
    const newResearchGateId =
      researchGateId || getPreviousAlumniInfo.researchGateId;
    const newGoogleScholarId =
      googleScholarId || getPreviousAlumniInfo.googleScholarId;
    const newYearOfPassout =
      yearOfPassout || getPreviousAlumniInfo.yearOfPassout;
    const newAlumniDetails = details || getPreviousAlumniInfo.details;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, 'masters_alumni_image');
      newAlumniImage = storedDataAccessUrl;
      newCloudPublicId = storedDataAccessId;

      getPreviousAlumniInfo.profilePicturePublicId &&
        (await customSingleDestroyer(
          getPreviousAlumniInfo.profilePicturePublicId
        ));
    } else {
      newAlumniImage = getPreviousAlumniInfo.profilePicture;
      newCloudPublicId = getPreviousAlumniInfo.profilePicturePublicId;
    }

    const updatedAlumniInfo = {
      alumniName: newAlumniName,
      profilePicture: newAlumniImage,
      profilePicturePublicId: newCloudPublicId,
      emailId: newEmailId,
      phoneNumber: newPhoneNumber,
      bscDoneFrom: newBscDoneFrom,
      researchGateId: newResearchGateId,
      googleScholarId: newGoogleScholarId,
      yearOfPassout: newYearOfPassout,
      details: newAlumniDetails,
    };

    const updateAlumniInfo = await mastersAlumniModel.findByIdAndUpdate(
      id,
      updatedAlumniInfo,
      { new: true }
    );

    if (!updateAlumniInfo) {
      return res.status(501).json({
        issue: 'Not implemented!',
        details: 'Something went wrong, please try again later.',
      });
    } else {
      masterAlumniCache.del('single_master_alumni');
      masterAlumniCache.del('all_master_alumni');
      dashboardCache.del('aggregated_data');
      return res.status(200).json({
        details: 'Requested resources has been successfully updated!',
      });
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: 'Unable to update due to some technical problem.',
    });
  }
};

module.exports = updateMastersAlumniCtrl;
