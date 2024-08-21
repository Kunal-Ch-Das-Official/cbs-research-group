// Content: Send Resopnse Mail To Contact Person From Admin Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: Role of this controller is to send response mail from admin.

const contactFormModel = require("../../models/contact-form-model/contactFormModel");
const contactResponseSendCtrl = require("../../utils/nodemailer-mail-sender/contactResponseSendCtrl");

const sendContactPersonResponseCtrl = async (req, res) => {
  const { id } = req.params;
  const { subject, emailBody } = req.body;

  try {
    const getContactPerson = await contactFormModel.findById(id);
    if (!getContactPerson) {
      res.status(404).json({
        error: "Requested user not found",
        message: "Please check the details carefully.",
      });
    } else {
      const { emailId, userName } = getContactPerson;
      await contactResponseSendCtrl(emailId, userName, subject, emailBody);
      res.status(200).json({
        message: "Email has been send successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
      Message: "Unable to send email due to some technical error.",
    });
  }
};

module.exports = sendContactPersonResponseCtrl;
