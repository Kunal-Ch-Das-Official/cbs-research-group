/**
 * Send Response Mail To Contact Person From Admin Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 21/08/2024
 *
 * Description:
 * This controller handles the process of sending a response email from an admin
 * to a contact person who submitted a contact form.
 *
 * Functionality:
 * - Receives the contact form details and the admin's response.
 * - Uses the provided information to compose a response email.
 * - Sends the response email to the contact person’s email address.
 * - Ensures that the response is sent using the appropriate email configuration.
 *
 * Usage:
 * Utilize this controller to respond to contact form submissions by sending emails
 * from the admin to the contact person. This allows for effective communication
 * and follow-up on contact form inquiries.
 */

const contactFormModel = require("../../models/contact-form-model/contactFormModel");
const contactResponseSendCtrl = require("../../utils/nodemailer-mail-sender/contactResponseSendCtrl");

const sendContactPersonResponseCtrl = async (req, res) => {
  const { id } = req.params;
  const { subject, emailBody } = req.body;

  try {
    const getContactPerson = await contactFormModel.findById(id);
    if (!getContactPerson) {
      return res.status(404).json({
        issue: "Not found!",
        details: "Requested resources are not found.",
      });
    } else {
      const { emailId, userName } = getContactPerson;
      await contactResponseSendCtrl(emailId, userName, subject, emailBody, res);
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: "Unable to send this email due to some technical problem.",
    });
  }
};

module.exports = sendContactPersonResponseCtrl;
