// Content: Members Login Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: Role of this controller is to handle login operations of authenticate members of cbs research groups.

const authMemberModel = require("../../../models/auth-user-model/auth-member-model/authMemberModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../../config/envConfig");

class loginAuthenticationMemberCtrl {
  static memberLogin = async (req, res) => {
    const { userEmail, userPassword } = req.body;
    try {
      if (userEmail && userPassword) {
        const findCorespondingMember = await authMemberModel.findOne({
          userEmail: userEmail,
        });
        if (!findCorespondingMember) {
          return res.status(404).json({
            error: "Member dose'nt exist!",
            message: "Contact to authority of CBS-Research-Groups",
          });
        } else {
          const isPasswordMatch = await bcrypt.compare(
            userPassword,
            findCorespondingMember.userPassword
          );
          if (
            findCorespondingMember.userEmail === userEmail &&
            isPasswordMatch === true
          ) {
            const authenticateMember = await authMemberModel.findOne({
              userEmail: userEmail,
            });
            const token = jwt.sign(
              { memberId: authenticateMember._id },
              jwtSecretKey,
              { expiresIn: "30d" }
            );

            return res.status(200).json({
              message: "Login successfull!",
              details: "Welcome to CBS-Research-Group",
              authentication_sign: token,
            });
          } else {
            return res.status(401).json({
              error: "Unauthorized Member",
              message: "Email or password dose not match",
            });
          }
        }
      } else {
        return res.status(400).json({
          error: "Bad Request!",
          message: "All fields are require",
        });
      }
    } catch (error) {
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to proceed login process due to some technical error!",
      });
    }
  };
}

module.exports = loginAuthenticationMemberCtrl;
