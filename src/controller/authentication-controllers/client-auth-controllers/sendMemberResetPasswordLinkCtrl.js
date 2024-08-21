// Content: Send Reset Password Link Of Member Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: Role of this controller is for password reset of member of cbs research group.

const jwt = require("jsonwebtoken");
const { jwtSecretKey, clientSideUrl } = require("../../../config/envConfig");
const authMemberModel = require("../../../models/auth-user-model/auth-member-model/authMemberModel");
const sendPasswordResetEmail = require("../../../utils/nodemailer-mail-sender/resetMailSendingHandler");

class sendMemberResetPasswordLink {
  static resetPassword = async (req, res) => {
    const { userEmail } = req.body;

    try {
      if (!userEmail) {
        return res.status(400).json({
          error: "Bad Request!",
          message: "Email adress is require",
        });
      } else {
        const getRequestedEmailId = await authMemberModel.findOne({
          userEmail: userEmail,
        });
        if (!getRequestedEmailId) {
          return res.status(404).json({
            error: "Email Id dose'nt exist",
            message: "Please check the email adress",
          });
        } else {
          const secret = getRequestedEmailId._id + jwtSecretKey;
          // Generate json web token
          const token = jwt.sign(
            { memberId: getRequestedEmailId._id },
            secret,
            {
              expiresIn: "5m",
            }
          );
          let link = `${clientSideUrl}/reset-password/${getRequestedEmailId._id}/${token}`;
          await sendPasswordResetEmail(
            getRequestedEmailId.userEmail,
            getRequestedEmailId.userName,
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
module.exports = sendMemberResetPasswordLink;
