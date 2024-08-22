// Content: Delete Specific Group News By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 18/08/2024
// Details: Role of this controller is to delete single group news by client request .

const groupNewsModel = require("../../models/group-news-model/groupNewsModel");

const deleteGroupNewsCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getPrevGroupNews = await groupNewsModel.findById(id);
    if (!getPrevGroupNews) {
      return res.status(404).json({
        error: "Requested group news are not found!",
        message: "Please check the details.",
      });
    } else {
      const deleteReqGroupNews = await groupNewsModel.findByIdAndDelete(id);
      if (!deleteReqGroupNews) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try after some time.",
        });
      } else {
        return res.status(200).json({
          message: "Requested group news has been successfully removed!",
        });
      }
    }
  } catch (error) {
    console.log(
      "Unable to delete group news due to internal server error.",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to delete group news due to some technical error.",
    });
  }
};
module.exports = deleteGroupNewsCtrl;
