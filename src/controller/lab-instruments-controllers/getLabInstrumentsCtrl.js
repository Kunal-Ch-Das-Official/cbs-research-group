/**
 * Get Access of Lab Instruments Info From Client Side Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 * Last update: 08/10/2024
 * Description:
 * This controller handles requests to retrieve and send all lab instrument data to
 * the client side. It is designed to provide users with comprehensive information
 * about lab instruments as requested.
 *
 * Functionality:
 * - Receives requests from the client to access lab instrument information.
 * - Fetches all relevant lab instrument data from the database.
 * - Sends the retrieved data to the client in a structured format.
 * - Ensures data accuracy and handles any errors that may occur during data retrieval.
 *
 * Usage:
 * Use this controller to provide clients with complete details of lab instruments,
 * enabling them to view or utilize this information as required. It is useful for
 * generating reports, displaying data on user interfaces, or any other client-side
 * applications that need access to lab instrument data.
 */

const labInstrumentModel = require('../../models/lab-instruments-model/labInstrumentModel');
const NodeCache = require('node-cache');
const labInstrumentCache = new NodeCache();

const getLabInstrumentsCtrl = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      // Check if lab Instrument is in cache
      const cachedSingleLabInstrument = labInstrumentCache.get(
        'single_lab_instrument'
      );
      if (cachedSingleLabInstrument) {
        return res.status(200).json(cachedSingleLabInstrument);
      } else {
        const getSingleInstrumentInfo = await labInstrumentModel.findById(id);
        if (!getSingleInstrumentInfo) {
          return res.status(404).json({
            issue: 'Not found!',
            details: 'Requested resources are not found.',
          });
        } else {
          // Cache the retrieved lab instrument
          labInstrumentCache.set(
            'single_lab_instrument',
            getSingleInstrumentInfo
          );
          return res.status(200).json(getSingleInstrumentInfo);
        }
      }
    } else {
      // Check if lab Instrument is in cache
      const allCachedLabInstrument =
        labInstrumentCache.get('all_lab_instrument');
      if (allCachedLabInstrument) {
        return res.status(200).json(allCachedLabInstrument);
      } else {
        const getAllInstrumentsInfo = await labInstrumentModel.find();
        if (!getAllInstrumentsInfo) {
          return res.status(404).json({
            issue: 'Not found!',
            details: 'Requested resources are not found.',
          });
        } else {
          // Cache the retrieved lab instrument
          labInstrumentCache.set('all_lab_instrument', getAllInstrumentsInfo);
          return res.status(200).json(getAllInstrumentsInfo);
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to find requested resources due to some technical problem.',
    });
  }
};

module.exports = { getLabInstrumentsCtrl, labInstrumentCache };
