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

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const groupNewsModel = require("../../models/group-news-model/groupNewsModel");

const updateGroupNewsCtrl = async (req, res) => {
  const { id } = req.params;
  const { newsTitle, content } = req.body;

  try {
    const getPreviousGroupNews = await groupNewsModel.findById(id);
    if (!getPreviousGroupNews) {
      return res.status(404).json({
        error: "Requested group news are not exist!",
        message: "Please fill up all required fields",
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
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try after some time",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/latest-news/groups`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/latest-news/groups/${id}`
        );
        return res.status(200).json({
          message: "Requested group news has been successfully updated!",
        });
      }
    }
  } catch (error) {
    console.log(
      "Unable to update group news due to some internal server error!",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to update group news due to some technical error",
    });
  }
};
module.exports = updateGroupNewsCtrl;
