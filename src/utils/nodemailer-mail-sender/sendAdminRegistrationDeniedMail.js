// Content: Nodemailer configuration.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 22/08/2024
// Details:

const nodemailer = require("nodemailer");
const {
  emailHostProtocol,
  emailPort,
  emailHostUser,
  emailHostPassword,
} = require("../../config/envConfig");

const sendAdminRegistrationDeniedMail = async (
  sendTo,
  userName,
  reasonToDenied,
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
      subject: " CBS Research Group - Requested Response Denied",
      html: `
    <div>
    <h2 align="center" >Dear, ${userName}</h2>
    <h3 align="center">We received a request for become admin user of cbs-research group here is our response email of your request</h3>

   
    <p align="center" >If you did not request a password reset, please ignore this email. Your password will remain unchanged, and no further action is required.
    For security reasons, this password reset link will expire in [Expiration Time: 5 minutes]. If you need further assistance, please don't hesitate to contact our support team.</p>

    <div align="center">
      We denied Your request because: 
      <br/>
      ${reasonToDenied}
     </div>


    <footer>
    <b>Thank you,</b>
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
module.exports = sendAdminRegistrationDeniedMail;
