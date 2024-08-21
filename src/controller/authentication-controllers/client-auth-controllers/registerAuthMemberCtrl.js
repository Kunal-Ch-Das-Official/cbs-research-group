// Content: Auth Members Signup Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this controller is to handle sign up process of authenticate members of cbs research groups.

const authMemberModel = require("../../../models/auth-user-model/auth-member-model/authMemberModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../../config/envConfig");

class authenticatedMemberCtrl {
  static registerAuthMember = async (req, res) => {
    const {
      userName,
      userEmail,
      userPassword,
      confirm_password,
      termsAndConditions,
    } = req.body;
    try {
      if (
        (userName && userEmail && userPassword && confirm_password,
        termsAndConditions)
      ) {
        const getExistingMembersData = await authMemberModel.findOne({
          userEmail: userEmail,
        });
        if (getExistingMembersData) {
          return res.status(409).json({
            error: "Confilct!",
            message: "The requested user with that email id already exists.",
          });
          // If not exist run this block of code
        } else {
          if (userPassword === confirm_password) {
            // Encrypt given password
            const salt = await bcrypt.genSalt(15);
            const hashPassword = await bcrypt.hash(userPassword, salt);
            const registerAsNewMember = new authMemberModel({
              userName: userName,
              userEmail: userEmail,
              userPassword: hashPassword,
              termsAndConditions: termsAndConditions,
            });

            const savedData = await registerAsNewMember.save();
            if (!savedData) {
              return res.status(500).json({
                error: "Unable to let in due to some technical error!",
                message: "Please try some time later!",
              });
            } else {
              const justCreateMember = await authMemberModel.findOne({
                userEmail: userEmail,
              });
              const token = jwt.sign(
                { memberId: justCreateMember._id },
                jwtSecretKey,
                { expiresIn: "28d" }
              );
              return res.status(201).json({
                message: "Registration successful!",
                details:
                  "Congratulations now you become member of cbs research lab !",
                authenticated_member_token: token,
              });
            }
          } else {
            return res.status(400).json({
              error: "Bad Request!",
              message: "Password and confirmation password dose not match.",
            });
          }
        }
      } else {
        return res.status(400).json({
          error: "Bad Request!",
          message: "All fields are require.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to proceed this request due to some technical error.",
      });
    }
  };
}
module.exports = authenticatedMemberCtrl;
