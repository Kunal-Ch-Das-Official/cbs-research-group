// Content: Change Member Login Password Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: Role of this controller is to handle password update process of authenticated member of cbs research groups.
const bcrypt = require("bcrypt");
const authMemberModel = require("../../../models/auth-user-model/auth-member-model/authMemberModel");
class changeAuthMemberPasswordCtrl {
  static changePassword = async (req, res) => {
    const { userPassword, confirm_password } = req.body;
    try {
      if ((userPassword, confirm_password)) {
        if (userPassword !== confirm_password) {
          return res.status(400).json({
            error: "Bad Request!",
            message: "Password and confirm password dose'nt match",
          });
        } else {
          const salt = await bcrypt.genSalt(15);
          const hashPassword = await bcrypt.hash(userPassword, salt);
          const updatePassword = await authMemberModel.findByIdAndUpdate(
            req.userName,
            {
              $set: {
                userPassword: hashPassword,
              },
            }
          );
          if (!updatePassword) {
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
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to change the password due to some technical error.",
      });
    }
  };
}
module.exports = changeAuthMemberPasswordCtrl;
