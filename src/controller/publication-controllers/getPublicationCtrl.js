// Content:  Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 23/08/2024
// Details: Role of this controller is to upload project details to the data base.

const publicationModel = require("../../models/publication-model/publicationModel");

const getPublicationCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const getSinglePublication = await publicationModel.findById(id);
      if (!getSinglePublication) {
        return res.status(404).json({
          error: "Requested resources are not found.",
          message: "Please check the details before you search",
        });
      } else {
        return res.status(200).sendCachedData(getSinglePublication);
      }
    } else {
      const getAllPublication = await publicationModel.find();
      if (!getAllPublication) {
        return res.status(404).json({
          error: "Publications are not available",
          message: "Need to upload publication.",
        });
      } else {
        return res.status(200).sendCachedData(getAllPublication);
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Unable to get publication due to some technical problem.",
    });
  }
};

module.exports = getPublicationCtrl;
