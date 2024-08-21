// Content: Send Reset Password Mail Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this controller is for send email to the admin user's given email id for password reset of cbs research groups.

const { jwtSecretKey, clientSideUrl } = require("../../../config/envConfig");

const jwt = require("jsonwebtoken");
const sendPasswordResetEmail = require("../../../utils/nodemailer-mail-sender/resetMailSendingHandler");
const authAdminUserModel = require("../../../models/auth-user-model/admin-user-model/authAdminUserModel");

class sendResetPasswordEmailCtrl {
  static sendResetPasswordLink = async (req, res) => {
    const { adminUserEmail } = req.body;
    try {
      if (!adminUserEmail) {
        return res.status(400).json({
          error: "Bad Request!",
          message: "Email adress is require",
        });
      } else {
        const requestedEmail = await authAdminUserModel.findOne({
          adminUserEmail: adminUserEmail,
        });
        if (!requestedEmail) {
          return res.status(404).json({
            error: "Email dose'nt exist",
            message: "Please check the email adress",
          });
        } else {
          const secret = requestedEmail._id + jwtSecretKey;
          // Generate json web token
          const token = jwt.sign({ adminId: requestedEmail._id }, secret, {
            expiresIn: "5m",
          });

          // Send password reset url to admin user's email id
          let link = `${clientSideUrl}/reset-password/${requestedEmail._id}/${token}`;

          await sendPasswordResetEmail(
            requestedEmail.adminUserEmail,
            requestedEmail.adminUserName,
            link
          );
          return res.status(200).json({
            message:
              "Your password reset link has been send to your provided email id go and check it out",
            details:
              "It will be valid for only 5min. So if you want to reset password then hurry up!!!",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to perform the task due to some technical error",
      });
    }
  };
}
module.exports = sendResetPasswordEmailCtrl;
