/**
 * Send Reset Password Mail Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This controller manages the process of sending a password reset email
 * to admin users of CBS Research Group. It handles requests to send
 * reset password instructions or links to the user's registered email
 * address.
 *
 * Functionality:
 * - Receives and processes requests for sending password reset emails.
 * - Validates the request, including user identification and email address.
 * - Composes and sends an email with reset instructions or a reset link.
 * - Handles any errors related to email sending and provides appropriate
 *   responses.
 *
 * Usage:
 * Use this controller to handle the sending of password reset emails to
 * admin users. It ensures that users receive the necessary instructions
 * to reset their passwords securely.
 */

const { jwtSecretKey, clientSideUrl } = require("../../config/envConfig");

const jwt = require("jsonwebtoken");
const authAdminUserModel = require("../../models/auth-admin-model/authAdminUserModel");
const sendPasswordResetEmail = require("../../utils/nodemailer-mail-sender/resetMailSendingHandler");

const sendResetPasswordEmailCtrl = async (req, res) => {
  const { adminUserEmail } = req.body;
  try {
    if (!adminUserEmail) {
      return res.status(400).json({
        issue: "Bad Request!",
        details: "Email Id is required.",
      });
    } else {
      const requestedEmail = await authAdminUserModel.findOne({
        adminUserEmail: adminUserEmail,
      });
      if (!requestedEmail) {
        return res.status(404).json({
          issue: "Admin user not exist!",
          details: "Please provide a valid admin user id.",
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
          link,
          res
        );
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: "Unable to perform the task due to some technical problem.",
    });
  }
};

module.exports = sendResetPasswordEmailCtrl;
