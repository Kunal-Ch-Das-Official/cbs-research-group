// Content:  Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 23/08/2024
// Details: Role of this controller is to upload project details to the data base.

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
