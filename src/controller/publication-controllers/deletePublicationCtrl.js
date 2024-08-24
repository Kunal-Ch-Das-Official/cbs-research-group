/**
 * Delete Specific Publication Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 23/08/2024
 *
 * Description:
 * This controller handles the deletion of specific publication details from
 * the database. It is responsible for processing requests to remove a publication
 * record based on client input, ensuring that outdated or incorrect publication
 * information is accurately removed.
 *
 * Functionality:
 * - Receives deletion requests for specific publication details from the client.
 * - Validates the request to ensure the specified publication exists in the database.
 * - Removes the publication record from the database.
 * - Handles any errors during the deletion process and provides appropriate responses.
 *
 * Usage:
 * Use this controller to delete a specific publication record from the database.
 * It ensures that only the targeted publication is removed based on client requests.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const publicationModel = require("../../models/publication-model/publicationModel");
const customSingleDestroyer = require("../../utils/cloudinary-single-destroyer/customSingleDestroyer");

const deletePublicationCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequiredPublication = await publicationModel.findById(id);
    if (!getRequiredPublication) {
      return res.status(404).json({
        error: "Requested publication are not found.",
        message: "Please try again later.",
      });
    } else {
      const {
        publicationThumbnailPublicId,
        firstOverviewPublicId,
        secondOverviewPublicId,
      } = getRequiredPublication;
      const publicIds = [
        publicationThumbnailPublicId,
        firstOverviewPublicId,
        secondOverviewPublicId,
      ];
      publicIds.forEach((pId) => {
        pId && customSingleDestroyer(pId);
      });
      const deleteRequestedPublication =
        await publicationModel.findByIdAndDelete(id);
      if (!deleteRequestedPublication) {
        return res.status(500).json({
          error:
            "Unable to delete this publication due to some technical problem.",
          message: "Please try again later.",
        });
      } else {
        clearCache(
          "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/publication/about-info"
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/publication/about-info/${req.params.id}`
        );
        return res.status(200).json({
          message: "Publication has been successfully removed.",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
      message:
        "Unable to delete this publication due to some technical problem",
    });
  }
};

module.exports = deletePublicationCtrl;
