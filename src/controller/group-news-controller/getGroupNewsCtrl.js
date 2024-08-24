// Content: Get All Group News Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send all group news data to the client by request of users.

const groupNewsModel = require("../../models/group-news-model/groupNewsModel");

const getGroupNewsCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getRequestedGroupNews = await groupNewsModel.findById(id);
      if (!getRequestedGroupNews) {
        return res.status(404).json({
          error: "Requested group news are not found!",
          message: "Please check the details!",
        });
      } else {
        return res.status(200).sendCachedData(getRequestedGroupNews);
      }
    } catch (error) {
      console.log(
        "Unable to get requested group news due to internal server error",
        error
      );
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to get single group news due to some technical error",
      });
    }
  } else {
    try {
      const getAllGroupNews = await groupNewsModel.find();
      if (!getAllGroupNews) {
        return res.status(404).json({
          error: "Requested group news are not available!",
          message: "Upload a group news info first!",
        });
      } else {
        return res.status(200).sendCachedData(getAllGroupNews);
      }
    } catch (error) {
      console.log(
        "Unable to get group news due to internal server error",
        error
      );
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to get the group news due to some technical error!",
      });
    }
  }
};
module.exports = getGroupNewsCtrl;
