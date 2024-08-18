// Content: Get All Group News Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send all group news data to the client by request of users.

const groupNewsModel = require("../../models/group-news-model/groupNewsModel");

const getGroupNewsCtrl = async (req, res) => {
  try {
    const getAllGroupNews = await groupNewsModel.find();
    if (!getAllGroupNews) {
      res.status(404).json({
        error: "Requested group news are not available!",
        message: "Upload a group news info first!",
      });
    } else {
      res.status(200).json(getAllGroupNews);
    }
  } catch (error) {
    console.log("Unable to get group news due to internal server error", error);
    res.status(500).json({
      Error: error.message,
      Message: "Unable to get the group news due to some technical error!",
    });
  }
};
module.exports = getGroupNewsCtrl;
