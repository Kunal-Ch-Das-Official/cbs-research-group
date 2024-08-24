// Content: Get Contact Info From Admin Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send all contact form info by request of admin.

const contactFormModel = require("../../models/contact-form-model/contactFormModel");

const getContactInfoCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getRequestedContactInfo = await contactFormModel.findById(id);
      if (!getRequestedContactInfo) {
        return res.status(404).json({
          error: "Requested resources are not found!",
          message: "Please check the details!",
        });
      } else {
        return res.status(200).sendCachedData(getRequestedContactInfo);
      }
    } catch (error) {
      console.log(
        "Unable to get requested resources due to internal server error",
        error
      );
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to get requested resources to some technical error",
      });
    }
  } else {
    try {
      const getAllRequestedContactInfo = await contactFormModel.find();
      if (!getAllRequestedContactInfo) {
        return res.status(404).json({
          error: "Requested resources are not available!",
        });
      } else {
        return res.status(200).sendCachedData(getAllRequestedContactInfo);
      }
    } catch (error) {
      console.log(
        "Unable to get requested resources to some internal server error",
        error
      );
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to get requested resources to some technical error!",
      });
    }
  }
};
module.exports = getContactInfoCtrl;
