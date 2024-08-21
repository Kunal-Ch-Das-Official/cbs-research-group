// Content: Reset Admin User Password Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this controller is for password reset of admin user.

const { jwtSecretKey } = require("../../../config/envConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authAdminUserModel = require("../../../models/auth-user-model/admin-user-model/authAdminUserModel");

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
