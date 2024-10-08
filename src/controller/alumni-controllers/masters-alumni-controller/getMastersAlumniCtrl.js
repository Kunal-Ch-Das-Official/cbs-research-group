/**
 * Get All Master Alumni Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 * Last update: 08/10/2024
 * Description:
 * This controller handles the process of retrieving and sending all records
 * of master alumni to the client upon request. It manages the provision of
 * comprehensive alumni data.
 *
 * Functionality:
 * - Receives and processes requests for retrieving all master alumni
 *   information from the client.
 * - Retrieves the complete set of master alumni records from the database.
 * - Sends the retrieved data to the client in response to their request.
 * - Handles errors and provides appropriate feedback if the data retrieval
 *   fails.
 *
 * Usage:
 * Use this controller to manage client requests for accessing all records
 * of master alumni. It ensures that the complete and accurate data is
 * provided to clients as requested.
 */

const mastersAlumniModel = require('../../../models/alumni-model/masters-alumni-model/mastersAlumniModel');
const NodeCache = require('node-cache');
const masterAlumniCache = new NodeCache();

const getMastersAlumniCtrl = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      // Check if master alumni is in cache
      const cachedSingleMscAlumni = masterAlumniCache.get(
        'single_master_alumni'
      );
      if (cachedSingleMscAlumni) {
        return res.status(200).json(cachedSingleMscAlumni);
      } else {
        const getSingleMastersAlumniInfo = await mastersAlumniModel.findById(
          id
        );
        if (!getSingleMastersAlumniInfo) {
          return res.status(404).json({
            issue: 'Not found!',
            details: 'Requested resources are not found.',
          });
        } else {
          // Cache the retrieved master alumni
          masterAlumniCache.set(
            'single_master_alumni',
            getSingleMastersAlumniInfo
          );
          return res.status(200).json(getSingleMastersAlumniInfo);
        }
      }
    } else {
      // Check if master alumni is in cache
      const allCachedMscAlumni = masterAlumniCache.get('all_master_alumni');
      if (allCachedMscAlumni) {
        return res.status(200).json(allCachedMscAlumni);
      } else {
        const getAllMastersAlumniInfo = await mastersAlumniModel.find();
        if (!getAllMastersAlumniInfo) {
          return res.status(404).json({
            issue: 'Not found!',
            details: 'Requested resources are not found.',
          });
        } else {
          // Cache the retrieved master alumni
          masterAlumniCache.set('all_master_alumni', getAllMastersAlumniInfo);
          return res.status(200).json(getAllMastersAlumniInfo);
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to find requested resources due to some technical problem',
    });
  }
};

module.exports = { getMastersAlumniCtrl, masterAlumniCache };
