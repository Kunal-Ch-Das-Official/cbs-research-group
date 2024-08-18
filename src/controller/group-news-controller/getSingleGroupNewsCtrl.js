// Content: Get Single Group News From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 18/08/2024
// Details: Role of this controller is to send single group news data to the client by request of user.

const groupNewsModel = require("../../models/group-news-model/groupNewsModel");

const getSingleGroupNewsCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const getRequestedGroupNews = await groupNewsModel.findById(id);
    if (!getRequestedGroupNews) {
      res.status(404).json({
        error: "Requested group news are not found!",
        message: "Please check the details!",
      });
    } else {
      res.status(200).json(getRequestedGroupNews);
    }
  } catch (error) {
    console.log(
      "Unable to get requested group news due to internal server error",
      error
    );
    res.status(500).json({
      Error: error.message,
      Message: "Unable to get single group news due to some technical error",
    });
  }
};
module.exports = getSingleGroupNewsCtrl;
