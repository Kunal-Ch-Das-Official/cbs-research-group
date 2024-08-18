// Content: Group News Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 18/08/2024
// Details: Role of this controller is to update existing group news to the data base.

const groupNewsModel = require("../../models/group-news-model/groupNewsModel");

const updateGroupNewsCtrl = async (req, res) => {
  const id = req.params.id;

  try {
    const getPreviousGroupNews = await groupNewsModel.findById(id);
    if (!getPreviousGroupNews) {
      res.status(404).json({
        error: "Requested group news are not exist!",
        message: "Please fill up all required fields",
      });
    } else {
      const newNewsTitle = req.body.newsTitle || getPreviousGroupNews.newsTitle;
      const newCorespondingContent =
        req.body.content || getPreviousGroupNews.content;

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
        res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try after some time",
        });
      } else {
        res.status(200).json({
          message: "Requested group news has been successfully updated!",
        });
      }
    }
  } catch (error) {
    console.log(
      "Unable to update group news due to some internal server error!",
      error
    );
    res.status(500).json({
      Error: error.message,
      Message: "Unable to update group news due to some technical error",
    });
  }
};
module.exports = updateGroupNewsCtrl;
