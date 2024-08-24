/**
 * Reset Admin User Password Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This controller handles the process of resetting passwords for admin
 * users of CBS Research Group. It manages password reset requests and
 * updates the user's password securely.
 *
 * Functionality:
 * - Processes password reset requests for admin users.
 * - Validates the reset request, including user identification and
 *   reset token.
 * - Handles the secure updating of the user's password.
 * - Provides appropriate responses for successful and failed password
 *   reset attempts.
 *
 * Usage:
 * Use this controller to manage password reset operations for admin users.
 * It ensures that password resets are handled securely and efficiently.
 */

const { jwtSecretKey } = require("../../config/envConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authAdminUserModel = require("../../models/auth-admin-model/authAdminUserModel");

const resetForgottenPassword = async (req, res) => {
  const { adminUserPassword, adminUserPassword_confirmation } = req.body;
  const { id, token } = req.params;
  try {
    const corespondingAdmin = await authAdminUserModel.findById(id);
    if (!corespondingAdmin) {
      return res.status(404).json({
        error: "Requested admin are not found",
      });
    } else {
      const new_secret = corespondingAdmin._id + jwtSecretKey;
      jwt.verify(token, new_secret);
      if (adminUserPassword && adminUserPassword_confirmation) {
        if (adminUserPassword !== adminUserPassword_confirmation) {
          return res.status(400).json({
            error: "Bad Request!",
            message: "Password and confirm password are not same",
          });
        } else {
          // Encrypt given password
          const salt = await bcrypt.genSalt(15);
          const hashPassword = await bcrypt.hash(adminUserPassword, salt);
          const updatePassword = await authAdminUserModel.findByIdAndUpdate(
            corespondingAdmin._id,
            {
              $set: {
                adminUserPassword: hashPassword,
              },
            }
          );
          if (!updatePassword) {
            return res.status(500).json({
              error: "Technical error occured!",
              message: "Unable to perform the task due to some technical error",
            });
          } else {
            return res.status(200).json({
              message: "Password has been updated successfully!",
            });
          }
        }
      } else {
        return res.status(400).json({
          error: "Bad Request!",
          message: "All fields are require",
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

module.exports = resetForgottenPassword;
