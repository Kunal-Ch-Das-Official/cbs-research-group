/**
 * Contact Form Post Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles the process of posting contact form details to the database.
 *
 * Functionality:
 * - Receives contact form submissions from clients.
 * - Validates the received data for completeness and correctness.
 * - Uploads the validated contact form details to the database.
 * - Ensures data integrity and handles any errors during the upload process.
 *
 * Usage:
 * Utilize this controller to manage the submission and storage of contact form data
 * provided by clients. This facilitates the collection and tracking of contact inquiries.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const contactFormModel = require("../../models/contact-form-model/contactFormModel");

const uploadContactInfoCtrl = async (req, res) => {
  const { userName, emailId, phoneNumber, desireCourse, message } = req.body;
  if (!userName || !emailId || !phoneNumber) {
    return res.status(400).json({
      error: "Bad Request!",
      message: "Please fill up all the fields carefully!",
    });
  } else {
    try {
      const contactUserDetails = new contactFormModel({
        userName,
        emailId,
        phoneNumber,
        desireCourse,
        message,
      });
      const uploadData = await contactUserDetails.save();
      if (!uploadData) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try it after some time",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/contact-us/information`
        );
        return res.status(201).json({
          message: "Contact form has been successfully uploaded!",
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
module.exports = uploadContactInfoCtrl;
