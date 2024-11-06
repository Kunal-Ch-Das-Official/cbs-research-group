/**
 * Delete Specific Group News By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This controller handles the process of deleting a specific group news entry
 * based on a request from a client.
 *
 * Functionality:
 * - Receives requests to delete group news entries.
 * - Validates the request to ensure it includes necessary information (e.g., news ID).
 * - Deletes the specified group news entry from the database.
 * - Handles errors and ensures the integrity of the database after the deletion.
 *
 * Usage:
 * Use this controller to manage the removal of specific group news items
 * as requested by clients. It ensures that the group's news content can
 * be updated or removed as needed.
 */

const groupNewsModel = require('../../models/group-news-model/groupNewsModel');

const deleteGroupNewsCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getPrevGroupNews = await groupNewsModel.findById(id);
    if (!getPrevGroupNews) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      const deleteReqGroupNews = await groupNewsModel.findByIdAndDelete(id);
      if (!deleteReqGroupNews) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        return res.status(200).json({
          details: 'Requested resources has been successfully removed!',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to delete requested resources due to some technical problem.',
    });
  }
};
module.exports = deleteGroupNewsCtrl;
