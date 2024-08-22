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

const sendPasswordResetEmail = async (
  sendTo,
  userName,
  corespondingLink,
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
      subject: " CBS Research Group - Admin User Password Reset Request",
      html: `
      <div>
      <h2 align="center" >Dear, ${userName}</h2>
      <h3 align="center">We received a request to reset the password for your account associated with this email address. If you made this request, please click the link below to reset your password:</h3>
      <div align="center">
       <font color="green">Reset password from here: </font><a href=${corespondingLink}>reset link</a>
       </div>
     
      <p align="center" >If you did not request a password reset, please ignore this email. Your password will remain unchanged, and no further action is required.
      For security reasons, this password reset link will expire in [Expiration Time: 5 minutes]. If you need further assistance, please don't hesitate to contact our support team.</p>
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
            "Unable to drop this mail due to technical problem. Please try again later",
        });
      } else {
        return response.status(200).json({
          message: "Email has been dropped successfully",
          sending_id: info.messageId,
          notification:
            "Password reset link has been sended to this email account.",
          alert: "Please use it before five minutes, else it will be expired.",
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
module.exports = sendPasswordResetEmail;
