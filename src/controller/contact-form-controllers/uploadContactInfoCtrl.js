// Content: Contact Form Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to upload contact form details to the data base.

const contactFormModel = require("../../models/contact-form-model/contactFormModel");

const uploadContactInfoCtrl = async (req, res) => {
  if (!req.body.userName || !req.body.emailId || !req.body.phoneNumber) {
    return res.status(400).json({
      error: "Bad Request!",
      message: "Please fill up all the fields carefully!",
    });
  } else {
    try {
      const contactUserDetails = new contactFormModel({
        userName: req.body.userName,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        desireCourse: req.body.desireCourse,
        message: req.body.message,
      });
      const uploadData = await contactUserDetails.save();
      if (!uploadData) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try it after some time",
        });
      } else {
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
