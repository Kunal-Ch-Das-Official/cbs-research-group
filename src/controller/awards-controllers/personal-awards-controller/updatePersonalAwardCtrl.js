/**
 * Personal Awards Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller manages the process of updating existing personal awards
 * records in the database. It handles requests to modify or amend the details
 * of personal awards as needed.
 *
 * Functionality:
 * - Receives and processes update requests for personal awards.
 * - Validates and verifies the provided data to ensure correctness.
 * - Updates the specified personal awards records in the database.
 * - Provides appropriate responses for successful and failed update operations.
 *
 * Usage:
 * Use this controller to handle requests for updating personal awards data.
 * It ensures that modifications to personal awards records are accurately
 * reflected in the database.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const personalAwardsModel = require("../../../models/awards-model/personal-awards-model/personalAwardsModel");

const updatePersonalAwardCtrl = async (req, res) => {
  const { id } = req.params;
  const { awardTitle, recivedFor, recivedDate } = req.body;
  try {
    const getPreviousPersonalAward = await personalAwardsModel.findById(id);
    if (!getPreviousPersonalAward) {
      return res.status(404).json({
        issue: "Not found!",
        details: "Requested resources are not found.",
      });
    } else {
      const newAwardTitle = awardTitle || getPreviousPersonalAward.awardTitle;
      const newAwardRecivedFor =
        recivedFor || getPreviousPersonalAward.recivedFor;
      const newAwardRecivedDate =
        recivedDate || getPreviousPersonalAward.recivedDate;

      const updatedPersonalAwards = {
        awardTitle: newAwardTitle,
        recivedFor: newAwardRecivedFor,
        recivedDate: newAwardRecivedDate,
      };

      const updateDetails = await personalAwardsModel.findByIdAndUpdate(
        id,
        updatedPersonalAwards,
        { new: true }
      );

      if (!updateDetails) {
        return res.status(501).json({
          issue: "Not implemented!",
          details: "Something went wrong, please try again later.",
        });
      } else {
        clearCache(
          "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal/awards"
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal/awards/${id}`
        );
        return res.status(200).json({
          details: "Requested resources has been successfully updated!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        "Unable to update requested resources due to some technical problem.",
    });
  }
};
module.exports = updatePersonalAwardCtrl;
