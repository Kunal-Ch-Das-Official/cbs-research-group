// Content: Reset Auth Member Forgotten Password Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: Role of this controller is for reset authenticate member's forgotten password .
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../../config/envConfig");
const authMemberModel = require("../../../models/auth-user-model/auth-member-model/authMemberModel");

class resetAuthMemberForgottenPassword {
  static resetForgottenPassword = async (req, res) => {
    const { userPassword, confirm_password } = req.body;
    const { id, token } = req.params;

    try {
      const findCorespondingMember = await authMemberModel.findById(id);
      if (!findCorespondingMember) {
        return res.status(404).json({
          error: "Requested member not found!",
        });
      } else {
        const new_secret = findCorespondingMember._id + jwtSecretKey;
        jwt.verify(token, new_secret);
        if (
          userPassword &&
          confirm_password &&
          userPassword === confirm_password
        ) {
          // Encrypt given password
          const salt = await bcrypt.genSalt(15);
          const hashPassword = await bcrypt.hash(userPassword, salt);
          const updatePassword = await authMemberModel.findByIdAndUpdate(
            findCorespondingMember._id,
            {
              $set: {
                userPassword: hashPassword,
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
        } else {
          return res.status(400).json({
            error: "Bad Request!",
            message: "Enter proper password this is not acceptable!",
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

module.exports = resetAuthMemberForgottenPassword;
