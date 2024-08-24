/**
 * Personal Awards Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles the process of uploading new personal awards records
 * to the database. It manages the addition of personal awards data as submitted
 * by users or administrators.
 *
 * Functionality:
 * - Receives and processes upload requests for personal awards.
 * - Validates and verifies the provided data for correctness and completeness.
 * - Inserts new personal awards records into the database.
 * - Provides appropriate responses for successful and failed upload operations.
 *
 * Usage:
 * Use this controller to manage the uploading of personal awards data into
 * the database. It ensures that new personal awards records are accurately
 * added to the system.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const personalAwardsModel = require("../../../models/awards-model/personal-awards-model/personalAwardsModel");

const uploadPersonalAwardsCtrl = async (req, res) => {
  const { awardTitle, recivedFor, recivedDate } = req.body;
  if (!req.body) {
    return res.status(400).json({
      error: "Bad Request!",
      message: "Please fill up all the fields carefully",
    });
  } else {
    try {
      const personalAward = new personalAwardsModel({
        awardTitle,
        recivedFor,
        recivedDate,
      });
      const uploadDetails = personalAward.save();
      if (!uploadDetails) {
        return res
          .status(422)
          .json({ error: "Failed to save award due to validation errors." });
      } else {
        clearCache(
          "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal/awards"
        );
        return res.status(201).json({
          message: "Award information has been successfully uploaded!",
        });
      }
    } catch (error) {
      console.log("Unable to upload due to internal server error!", error);
      return res.status(500).json({
        Error: error.message,
        Message:
          "Unable to upload awards information due to some technical error",
      });
    }
  }
};
module.exports = uploadPersonalAwardsCtrl;
