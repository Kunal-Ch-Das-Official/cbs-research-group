// Content: Admin Signup Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this controller is to handle sign up process of admin user of cbs research groups.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../../config/envConfig");
const authAdminUserModel = require("../../../models/auth-user-model/admin-user-model/authAdminUserModel");
class registerAsAdminCtrl {
  static adminRegistration = async (req, res) => {
    try {
      // Get all require fields from req.body
      const {
        adminUserName,
        adminUserEmail,
        adminUserPassword,
        adminUserPassword_confirmation,
        termsAndConditions,
      } = req.body;

      // Check is users email already exist or not
      const adminUser = await authAdminUserModel.findOne({
        adminUserEmail: adminUserEmail,
      });
      // If user exist the run this block of code
      if (adminUser) {
        return res.status(409).json({
          error: "Confilct!",
          message: "The requested user with that email id already exists.",
        });
        // If not exist run this block of code
      } else {
        // Check is user has fiiled all the required fields or not
        if (
          adminUserName &&
          adminUserEmail &&
          adminUserPassword &&
          adminUserPassword_confirmation &&
          termsAndConditions
        ) {
          // user has fiiled all the required fields then run this block of code
          if (adminUserPassword === adminUserPassword_confirmation) {
            // Encrypt given password
            const salt = await bcrypt.genSalt(15);
            const hashPassword = await bcrypt.hash(adminUserPassword, salt);
            // Store all the given data to database
            const authPassUser = new authAdminUserModel({
              adminUserName: adminUserName,
              adminUserEmail: adminUserEmail,
              adminUserPassword: hashPassword,
              termsAndConditions: termsAndConditions,
            });

            // Save the given data
            const saveAsNewAdmin = await authPassUser.save();
            // If not been saved send this response
            if (!saveAsNewAdmin) {
              return res.status(500).json({
                error: "Unable to let in due to some technical error!",
                message: "Please try some time later!",
              });
              // If been saved send this response
            } else {
              const savedAdmin = await authAdminUserModel.findOne({
                adminUserEmail: adminUserEmail,
              });
              // Generate json web token
              const token = jwt.sign(
                { adminId: savedAdmin._id },
                jwtSecretKey,
                { expiresIn: "365d" }
              );
              return res.status(201).json({
                message: "Registration successful!",
                details:
                  "Congratulations now you become admin user of cbs research lab !",
                authenticated_admin_token: token,
              });
            }

            //If Password and confirmation password dose not match then send this response
          } else {
            return res.status(400).json({
              error: "Bad Request!",
              message: "Password and confirmation password dose not match.",
            });
          }
          // If user did'nt fiiled all the required fields then send this response
        } else {
          return res.status(400).json({
            error: "Bad Request!",
            message: "All fields are require.",
          });
        }
      }
      // If there are any problem to execute this code then run this block
    } catch (error) {
      console.log(`Internal server error cause: ${error}`);
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to process due to some technical error!",
      });
    }
  };
}

module.exports = registerAsAdminCtrl;
