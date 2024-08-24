/**
 * Get Publication Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 23/08/2024
 *
 * Description:
 * This controller handles the retrieval of publication details from the database.
 * It is responsible for processing requests to fetch specific publication records
 * based on client input, allowing users to view publication information.
 *
 * Functionality:
 * - Receives requests to retrieve publication details from the database.
 * - Validates the request to ensure the specified publication exists.
 * - Retrieves the publication record and returns it to the client.
 * - Handles any errors during the retrieval process and provides appropriate responses.
 *
 * Usage:
 * Use this controller to fetch and return details of specific publications based on
 * client requests. It ensures that users can access up-to-date publication information.
 */

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
