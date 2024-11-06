/**
 * Admin Signup Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This controller manages the signup process for admin users of CBS
 * Research Group. It handles registration requests, validates user
 * input, and creates new admin user accounts.
 *
 * Functionality:
 * - Receives and processes signup requests from prospective admin users.
 * - Validates the provided information, including username, email, and
 *   password.
 * - Handles the creation of new admin user accounts, including password
 *   hashing and data storage.
 * - Provides appropriate responses for successful and failed signup attempts.
 *
 * Usage:
 * Use this controller to handle the signup operations for new admin users.
 * It ensures secure and efficient registration of admin accounts in the
 * system.
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../../config/envConfig');
const authAdminUserModel = require('../../models/auth-admin-model/authAdminUserModel');

const registerAsAdminCtrl = async (req, res) => {
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
      adminUserEmail,
    });
    // If user exist the run this block of code
    if (adminUser) {
      return res.status(409).json({
        issue: 'Confilct!',
        details: 'Requested user with this email id already exists.',
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
            adminUserName,
            adminUserEmail,
            adminUserPassword: hashPassword,
            termsAndConditions,
          });

          // Save the given data
          const saveAsNewAdmin = await authPassUser.save();
          // If not been saved send this response
          if (!saveAsNewAdmin) {
            return res.status(501).json({
              issue: 'Not implemented!',
              details: 'Something went wrong, please try again later.',
            });
            // If been saved send this response
          } else {
            const savedAdmin = await authAdminUserModel.findOne({
              adminUserEmail,
            });
            // Generate json web token
            const token = jwt.sign({ adminId: savedAdmin._id }, jwtSecretKey, {
              expiresIn: '1d',
            });
            return res.status(201).json({
              message: 'Registration successful!',
              details:
                'Congratulations now you become admin user of CBS Research Group !',
              authenticated_admin_token: token,
            });
          }

          //If Password and confirmation password dose not match then send this response
        } else {
          return res.status(400).json({
            issue: 'Bad Request!',
            details: "Password and confirmation password dosen't match.",
          });
        }
        // If user did'nt fiiled all the required fields then send this response
      } else {
        return res.status(400).json({
          issue: 'Bad Request!',
          details: 'All fields are required.',
        });
      }
    }
    // If there are any problem to execute this code then run this block
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: 'Unable to process due to some technical problem.',
    });
  }
};

module.exports = registerAsAdminCtrl;
