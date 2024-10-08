/**
 * Get Publication Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 23/08/2024
 * Last update: 08/10/2024
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

const publicationModel = require('../../models/publication-model/publicationModel');
const NodeCache = require('node-cache');
const publicationCache = new NodeCache();

const getPublicationCtrl = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      // Check if publication is in cache
      const cachedSinglePublication =
        publicationCache.get('single_publication');
      if (cachedSinglePublication) {
        return res.status(200).json(cachedSinglePublication);
      } else {
        const getSinglePublication = await publicationModel.findById(id);
        if (!getSinglePublication) {
          return res.status(404).json({
            issue: 'Not found!',
            details: 'Requested resource is not found.',
          });
        } else {
          // Cache the retrieved publication
          publicationCache.set('single_publication', getSinglePublication);
          return res.status(200).json(getSinglePublication);
        }
      }
    } else {
      const allCachedPublication = publicationCache.get('all_publication');
      if (allCachedPublication) {
        return res.status(200).json(allCachedPublication);
      } else {
        const getAllPublication = await publicationModel.find();
        if (!getAllPublication) {
          return res.status(404).json({
            issue: 'Not found!',
            details: 'Requested resource is not found.',
          });
        } else {
          publicationCache.set('all_publication', getAllPublication);
          return res.status(200).json(getAllPublication);
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: 'Unable to find requested resources due to a technical problem.',
    });
  }
};

module.exports = { getPublicationCtrl, publicationCache };
