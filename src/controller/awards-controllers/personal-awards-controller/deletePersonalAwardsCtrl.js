// Content: Delete Specific Personal Awards By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to delete personal awards news by client request .

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const personalAwardsModel = require("../../../models/awards-model/personal-awards-model/personalAwardsModel");

const deletePersonalAwardsCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getPreviousPersonalAward = personalAwardsModel.findById(id);
    if (!getPreviousPersonalAward) {
      return res.status(404).json({
        error: "Requested personal awards are not found!",
        message: "please check the details",
      });
    } else {
      const deletePersonalAward = await personalAwardsModel.findByIdAndDelete(
        id
      );
      if (!deletePersonalAward) {
        return res
          .status(422)
          .json({ error: "Failed to save award due to validation errors." });
      } else {
        clearCache(
          "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal/awards"
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal/awards/${id}`
        );
        return res.status(200).json({
          message: "Requested personal awards has been successfully removed!",
        });
      }
    }
  } catch (error) {
    console.log(
      "Unable to delete personal awards due to some internal server error",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message:
        "Unable to delete requested personal award due to some technical error!",
    });
  }
};
module.exports = deletePersonalAwardsCtrl;
