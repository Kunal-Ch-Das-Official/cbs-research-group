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

const contactResponseSendCtrl = async (sendTo, userName, subject, mailBody) => {
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
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.messageId);
    }
  });
};
module.exports = contactResponseSendCtrl;
