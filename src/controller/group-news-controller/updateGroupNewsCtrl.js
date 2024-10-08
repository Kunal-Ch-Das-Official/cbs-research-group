/**
 * Group News Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This controller handles the update of existing group news in the database.
 *
 * Functionality:
 * - Receives requests to update group news information.
 * - Validates and processes the update request.
 * - Updates the relevant group news entry in the database.
 * - Handles any errors that may occur during the update process.
 *
 * Usage:
 * Use this controller to modify or update existing group news records
 * based on client requests. It ensures that the database contains the
 * most current and accurate information regarding group news.
 */

const groupNewsModel = require('../../models/group-news-model/groupNewsModel');

const updateGroupNewsCtrl = async (req, res) => {
  const { id } = req.params;
  const { newsTitle, content } = req.body;

  try {
    const getPreviousGroupNews = await groupNewsModel.findById(id);
    if (!getPreviousGroupNews) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      const newNewsTitle = newsTitle || getPreviousGroupNews.newsTitle;
      const newCorespondingContent = content || getPreviousGroupNews.content;

      const updatedNews = {
        newsTitle: newNewsTitle,
        content: newCorespondingContent,
      };

      const updateGroupNews = await groupNewsModel.findByIdAndUpdate(
        id,
        updatedNews,
        { new: true }
      );

      if (!updateGroupNews) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        return res.status(200).json({
          details: 'Requested resources has been successfully updated!',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to update requested resources due to some technical problem.',
    });
  }
};
module.exports = updateGroupNewsCtrl;
