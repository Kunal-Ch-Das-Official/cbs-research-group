// Content: Project Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 23/08/2024
// Details: Role of this controller is to upload project details to the data base.

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const publicationModel = require("../../models/publication-model/publicationModel");
const customSingleDestroyer = require("../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../utils/custom-file-cleaner/localFileCleaner");

const uploadPublicationCtrl = async (req, res) => {
  const { title, contributer, aboutPublication, publishedDate, pdfLink } =
    req.body;
  const { publicationThumbnail, firstOverview, secondOverview } = req.files;

  const publicationImages = [
    publicationThumbnail[0].path,
    firstOverview[0].path,
    secondOverview[0].path,
  ];

  try {
    if (!req.body && !req.files) {
      return res.status(400).json({
        error: "Bad Request!",
        message: "All fields are required.",
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
              await customSingleUploader(path, "publication_image");

            allRequiredImage.push({
              secureUrl: storedDataAccessUrl,
              publicId: storedDataAccessId,
            });
          } catch (error) {
            return res.status(500).json({
              error: error.message,
              message: "cloudinary error occured.",
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
          publicationImages.forEach((file) => {
            cleanupFile(file);
          });
          return res.status(500).json({
            error:
              "Unable to upload publication due to some technical problem.",
          });
        } else {
          publicationImages.forEach((file) => {
            cleanupFile(file);
          });
          clearCache(
            "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/publication/about-info"
          );
          return res.status(201).json({
            message: "Publication has been successfully uploaded.",
          });
        }
      } else {
        return res.status(400).json({
          error: "Bad Request!",
        });
      }
    }
  } catch (error) {
    allRequiredImage.forEach((pubId) => {
      customSingleDestroyer(pubId.publicId);
    });
    publicationImages.forEach((file) => {
      cleanupFile(file);
    });
    return res.status(500).json({
      error: error.message,
      message:
        "Unable to upload publication information due to some technical problem",
      alert:
        "If the issue are not resolve autometically then contact with your tech team.",
    });
  }
};

module.exports = uploadPublicationCtrl;
