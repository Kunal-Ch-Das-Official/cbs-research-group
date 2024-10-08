/**
 * Master Alumni Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 15/08/2024
 *
 * Description:
 * This controller handles the process of uploading individual records of
 * master alumni to the database. It manages the insertion of new alumni
 * data based on client or admin submissions.
 *
 * Functionality:
 * - Receives and processes requests to upload new master alumni information.
 * - Validates the incoming data to ensure it meets required formats and
 *   criteria.
 * - Inserts the new alumni records into the database.
 * - Provides appropriate responses for successful and failed upload
 *   operations.
 *
 * Usage:
 * Use this controller to manage the uploading of individual master alumni
 * records to the database. It ensures that new data can be accurately
 * added to the system as required.
 */

const mastersAlumniModel = require('../../../models/alumni-model/masters-alumni-model/mastersAlumniModel');
const customSingleUploader = require('../../../utils/cloudinary-single-uploader/customSingleUploader');
const customSingleDestroyer = require('../../../utils/cloudinary-single-destroyer/customSingleDestroyer');

const uploadMastersAlumniCtrl = async (req, res) => {
  let profileImageUrl;
  let profileImgPublicId;
  let filePath;
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

  if (!req.body || !req.file) {
    return res.status(400).json({
      issue: 'Bad request!',
      details: 'All fields are required.',
    });
  } else {
    try {
      if (req.file) {
        filePath = req.file.buffer;
        const { storedDataAccessUrl, storedDataAccessId } =
          await customSingleUploader(filePath, 'masters_alumni_image');
        profileImageUrl = storedDataAccessUrl;
        profileImgPublicId = storedDataAccessId;
      }
      const mastersAlumniInfo = new mastersAlumniModel({
        alumniName,
        profilePicture: profileImageUrl,
        profilePicturePublicId: profileImgPublicId,
        emailId,
        phoneNumber,
        bscDoneFrom,
        researchGateId,
        googleScholarId,
        yearOfPassout,
        details,
      });

      const uploadedData = await mastersAlumniInfo.save();
      if (!uploadedData) {
        profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));

        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        return res.status(201).json({
          details: 'Requested resources has been successfully uploaded!',
        });
      }
    } catch (error) {
      profileImgPublicId && (await customSingleDestroyer(profileImgPublicId));
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to upload requested resources due to some technical problem.',
      });
    }
  }
};
module.exports = uploadMastersAlumniCtrl;
