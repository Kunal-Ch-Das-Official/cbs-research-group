// Content: Nodemailer configuration.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details:

const nodemailer = require("nodemailer");
const {
  emailHostProtocol,
  emailPort,
  emailHostUser,
  emailHostPassword,
} = require("../../config/envConfig");

const contactResponseSendCtrl = async (
  sendTo,
  userName,
  subject,
  mailBody,
  response
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: emailHostProtocol,
      port: emailPort,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: emailHostUser,
        pass: emailHostPassword,
      },
    });
    const mailOptions = {
      from: emailHostUser, // Sender address
      to: sendTo, // List of receivers
      subject: subject,
      html: `
      <div>
      <h2 align="left" >Dear, ${userName}</h2>
      <h3 align="center">We received your email and we are happy to let you know!</h3>
      
      <p align="center" >${mailBody}</p>
      <footer>
      <b>Thank you for contact us,</b>
      <br/>
      <b>CBS-Research-Group,</b>
          <br/>
      <b>${emailHostUser},</b>
      </footer>
      
      <p>This email was sent to ${sendTo}. If you received this email by mistake, please disregard it.,</p>
      </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return response.status(500).json({
          issue: error.message,
          details:
            "Unable to drop this mail due to some technical problem. Please try again later.",
          alert:
            "If the issue not resolve autometically then contact to your tech support team.",
        });
      } else {
        return response.status(200).json({
          message: "Email has been dropped successfully.",
          sending_id: info.messageId,
          notification: `The mail has been successfully droppet to this:${sendTo} account.`,
        });
      }
    });
  } catch (error) {
    return response.status(500).json({
      issue: error.message,
      details:
        "Unable to perform this task due to some internal server problem.",
      message:
        "Please try again later, or if the issue not resolve autometically then contact with your tech support team.",
    });
  }
};
module.exports = contactResponseSendCtrl;
