// Content: Delete Specific Contact Info By Client Admin Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 18/08/2024
// Details: Role of this controller is to delete single contact info by admin request .

const contactFormModel = require("../../models/contact-form-model/contactFormModel");

const deleteContactInfoCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const getRequiredContactInfo = await contactFormModel.findById(id);
    if (!getRequiredContactInfo) {
      return res.status(404).json({
        error: "Requested group news are not found!",
        message: "Please check the details.",
      });
    } else {
      const deleteReqContactInfo = await contactFormModel.findByIdAndDelete(id);
      if (!deleteReqContactInfo) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try after some time.",
        });
      } else {
        return res.status(200).json({
          message: "Requested resources has been successfully removed!",
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
module.exports = deleteContactInfoCtrl;
