/**
 * Get Group News Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles requests to retrieve all group news data
 * and send it to the client.
 *
 * Functionality:
 * - Receives requests to fetch group news information.
 * - Retrieves all relevant group news data from the database.
 * - Sends the retrieved data to the client.
 * - Handles any errors that may occur during data retrieval.
 *
 * Usage:
 * Use this controller to provide clients with complete group news information
 * as requested. It ensures that users can access up-to-date news about the group.
 */

const groupNewsModel = require('../../models/group-news-model/groupNewsModel');

const getGroupNewsCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getRequestedGroupNews = await groupNewsModel.findById(id);
      if (!getRequestedGroupNews) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getRequestedGroupNews);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to find requested resources due to some technical problem.',
      });
    }
  } else {
    try {
      const getAllGroupNews = await groupNewsModel.find();
      if (!getAllGroupNews) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getAllGroupNews);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to find requested resources due to some technical problem.',
      });
    }
  }
};
module.exports = getGroupNewsCtrl;
