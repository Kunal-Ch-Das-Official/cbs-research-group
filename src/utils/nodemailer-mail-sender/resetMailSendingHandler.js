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

const sendPasswordResetEmail = async (sendTo, userName, corespondingLink) => {
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
    <h2 align="center" >Dear ${userName},</h2>
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
    <b>chinmoyslab@gmail.com,</b>
    </footer>
    
    <p>This email was sent to ${sendTo}. If you received this email by mistake, please disregard it.,</p>
    </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.messageId);
    }
  });
};
module.exports = sendPasswordResetEmail;
