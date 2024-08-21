// Content: Admin Login Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this controller is to handle login process of admin user of cbs research groups.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../../config/envConfig");
const authAdminUserModel = require("../../../models/auth-user-model/admin-user-model/authAdminUserModel");
class loginAsAdminCtrl {
  static adminLogin = async (req, res) => {
    // Collect authenticated emails and password from request body
    const { adminUserEmail, adminUserPassword } = req.body;
    try {
      // Check if not email or password filled then block of code
      if (adminUserEmail && adminUserPassword) {
        const isAdmin = await authAdminUserModel.findOne({
          adminUserEmail: adminUserEmail,
        });
        // If email not exist then run this block of code
        if (!isAdmin) {
          return res.status(415).json({
            error: "Unsupported Admin!",
            message: "You are not authenticated admin!",
          });
          // If email exist then run this block of code
        } else {
          // Compare the given password with existing password with the help of bcrypt
          const isPasswordMatch = await bcrypt.compare(
            adminUserPassword,
            isAdmin.adminUserPassword
          );
          // Check if email and password are match then run this block of code
          if (
            isAdmin.adminUserEmail === adminUserEmail &&
            isPasswordMatch === true
          ) {
            const authenticateAdmin = await authAdminUserModel.findOne({
              adminUserEmail: adminUserEmail,
            });
            // Generate json web token
            const token = jwt.sign(
              { adminId: authenticateAdmin._id },
              jwtSecretKey,
              { expiresIn: "10d" }
            );
            return res.status(200).json({
              message: "Login successfull!",
              details: "Welcome to CBS Research Group admin portal",
              authentication_sign: token,
            });
            // Check if email and password are not match then run this block of code
          } else {
            return res.status(401).json({
              error: "Unauthorized Admin",
              message: "Email or password dose not match",
            });
          }
        }
        // Check if all fields are not empty then block of code
      } else {
        // Check is the email exist on database or not
        return res.status(400).json({
          error: "Bad Request!",
          message: "Email and password require",
        });
      }
      // If there are any error in this code then this will executed
    } catch (error) {
      console.log(
        `Unable to login due to some internal server error. cause:${error}`
      );
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to proceed login process due to some technical error!",
      });
    }
  };
}
module.exports = loginAsAdminCtrl;
