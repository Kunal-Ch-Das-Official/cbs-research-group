// Content: Group News Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 18/08/2024
// Details: Role of this controller is to upload group news to the data base.

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const groupNewsModel = require("../../models/group-news-model/groupNewsModel");

const uploadGroupNewsCtrl = async (req, res) => {
  const { newsTitle, content } = req.body;
  if (!req.body) {
    return res.status(400).json({
      error: "Bad Request!",
      message: "Please fill up all the fields carefully!",
    });
  } else {
    try {
      const latestGroupNews = new groupNewsModel({ newsTitle, content });
      const uploadData = await latestGroupNews.save();
      if (!uploadData) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try it after some time",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/latest-news/groups`
        );
        return res.status(201).json({
          message: "Group news has been successfully uploaded!",
        });
      }
    } catch (error) {
      console.log(`Unable to upload this data due to:${error}`);
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to upload group news due to some technical error!",
      });
    }
  }
};
module.exports = uploadGroupNewsCtrl;
