/**
 * Publication Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 23/08/2024
 * Last update: 08/10/2024
 * Description:
 * This controller handles the upload of publication details to the database.
 * It manages requests to insert new publication records into the system, ensuring
 * that all necessary information is provided and correctly formatted.
 *
 * Functionality:
 * - Receives requests to upload new publication details to the database.
 * - Validates the input data to ensure completeness and correctness.
 * - Performs the upload operation and saves the new publication record to the database.
 * - Handles any errors during the upload process and provides appropriate responses.
 *
 * Usage:
 * Use this controller to upload new publication details into the database. It ensures that
 * publication information is accurately stored and available for retrieval.
 */

const publicationModel = require('../../models/publication-model/publicationModel');
const customSingleDestroyer = require('../../utils/cloudinary-single-destroyer/customSingleDestroyer');
const customSingleUploader = require('../../utils/cloudinary-single-uploader/customSingleUploader');
const { dashboardCache } = require('../dashboard-controllers/getAllData');
const { publicationCache } = require('./getPublicationCtrl');

const uploadPublicationCtrl = async (req, res) => {
  const { title, contributer, aboutPublication, publishedDate, pdfLink } =
    req.body;
  const { publicationThumbnail, firstOverview, secondOverview } = req.files;

  const publicationImages = [
    publicationThumbnail[0].buffer,
    firstOverview[0].buffer,
    secondOverview[0].buffer,
  ];

  try {
    if (!req.body && !req.files) {
      return res.status(400).json({
        issue: 'Bad Request!',
        details: 'All fields are required.',
      });
    } else {
      if (
        title &&
        contributer &&
        aboutPublication &&
        publishedDate &&
        pdfLink &&
        publicationThumbnail &&
        firstOverview &&
        secondOverview
      ) {
        var allRequiredImage = [];
        for (const path of publicationImages) {
          try {
            const { storedDataAccessUrl, storedDataAccessId } =
              await customSingleUploader(path, 'publication_image');

            allRequiredImage.push({
              secureUrl: storedDataAccessUrl,
              publicId: storedDataAccessId,
            });
          } catch (error) {
            return res.status(500).json({
              issue: error.message,
              details: 'cloudinary error occured.',
            });
          }
        }
        const uploadPublicationInfo = new publicationModel({
          publicationThumbnail: allRequiredImage[0].secureUrl,
          publicationThumbnailPublicId: allRequiredImage[0].publicId,
          firstOverview: allRequiredImage[1].secureUrl,
          firstOverviewPublicId: allRequiredImage[1].publicId,
          secondOverview: allRequiredImage[2].secureUrl,
          secondOverviewPublicId: allRequiredImage[2].publicId,
          title,
          contributer,
          aboutPublication,
          publishedDate,
          pdfLink,
        });

        const savedPublication = await uploadPublicationInfo.save();
        if (!savedPublication) {
          allRequiredImage.forEach((pubId) => {
            customSingleDestroyer(pubId.publicId);
          });
          return res.status(501).json({
            issue: 'Not implemented!',
            details: 'Something went wrong, please try again later.',
          });
        } else {
          publicationCache.del('all_publication');
          publicationCache.del('single_publication');
          dashboardCache.del('aggregated_data');
          return res.status(201).json({
            details: 'Requested resources has been successfully uploaded!',
          });
        }
      } else {
        return res.status(400).json({
          issue: 'Bad Request!',
          details: 'All fields are required.',
        });
      }
    }
  } catch (error) {
    allRequiredImage.forEach((pubId) => {
      customSingleDestroyer(pubId.publicId);
    });

    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to upload requested resources due to some technical problem.',
    });
  }
};

module.exports = uploadPublicationCtrl;
