/**
 * Group News Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This controller handles the upload of group news to the database.
 *
 * Functionality:
 * - Receives requests to upload new group news.
 * - Validates and processes the upload request.
 * - Inserts the new group news entry into the database.
 * - Handles any errors that may occur during the upload process.
 *
 * Usage:
 * Use this controller to add new group news records to the database.
 * It ensures that the latest group news information is properly stored
 * and available for retrieval and display.
 */

const groupNewsModel = require('../../models/group-news-model/groupNewsModel');

const uploadGroupNewsCtrl = async (req, res) => {
  const { newsTitle, content } = req.body;
  if (!req.body) {
    return res.status(400).json({
      issue: 'Bad Request!',
      details: 'All fields are required.',
    });
  } else {
    try {
      const latestGroupNews = new groupNewsModel({ newsTitle, content });
      const uploadData = await latestGroupNews.save();
      if (!uploadData) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        return res.status(201).json({
          details: 'Requested resources has been successfully uploaded!',
        });
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to upload requested resources due to some technical problem.',
      });
    }
  }
};
module.exports = uploadGroupNewsCtrl;
