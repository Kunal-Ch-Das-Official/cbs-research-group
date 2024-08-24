/**
 * Change Admin Login Password Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This controller handles the process of updating the login password for
 * authenticated admin users of CBS Research Group. It manages password
 * change requests, ensuring that only authenticated and authorized users
 * can update their passwords.
 *
 * Functionality:
 * - Validates the request to ensure the user is authenticated.
 * - Processes the password update request, including validation and
 *   hashing of the new password.
 * - Updates the user's password in the database and handles any errors
 *   that may occur during the process.
 *
 * Usage:
 * Use this controller to manage password change operations for admin users.
 * It ensures secure and efficient handling of password updates, maintaining
 * the integrity of the authentication system.
 */

const bcrypt = require("bcrypt");
const authAdminUserModel = require("../../models/auth-admin-model/authAdminUserModel");

const changeAuthAdminPasswordCtrl = async (req, res) => {
  const { adminUserPassword, adminUserPassword_confirmation } = req.body;
  try {
    if (adminUserPassword && adminUserPassword_confirmation) {
      if (adminUserPassword !== adminUserPassword_confirmation) {
        return res.status(400).json({
          error: "Bad Request!",
          message: "Password and confirm password dose'nt match",
        });
      } else {
        const salt = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(adminUserPassword, salt);
        const newPassword = await authAdminUserModel.findByIdAndUpdate(
          req.adminUserName._id,
          {
            $set: {
              adminUserPassword: hashPassword,
            },
          }
        );
        if (!newPassword) {
          return res.status(500).json({
            error:
              "Unable to store the new password due to some technical error",
            message: "Please try again later.",
          });
        } else {
          return res.status(200).json({
            message: "Password has been successfully updated.",
          });
        }
      }
    } else {
      return res.status(400).json({
        error: "Bad Request!",
        message: "All fields are required.",
      });
    }
  } catch (error) {
    console.log(
      `Unable to change password due to internal server error. Cause:${error}`
    );
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to change the password due to some technical error.",
    });
  }
};
module.exports = changeAuthAdminPasswordCtrl;
