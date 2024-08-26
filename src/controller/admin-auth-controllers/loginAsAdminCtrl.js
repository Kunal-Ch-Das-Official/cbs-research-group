/**
 * Admin Login Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This controller manages the login process for admin users of CBS
 * Research Group. It handles authentication requests, verifies user
 * credentials, and manages login sessions.
 *
 * Functionality:
 * - Receives and processes login requests from admin users.
 * - Validates user credentials, including username and password.
 * - Manages the creation of authentication tokens or sessions upon successful
 *   login.
 * - Handles authentication errors and provides appropriate responses.
 *
 * Usage:
 * Use this controller to handle login operations for admin users. It ensures
 * secure authentication and session management as part of the login process.
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../config/envConfig");
const authAdminUserModel = require("../../models/auth-admin-model/authAdminUserModel");

const loginAsAdminCtrl = async (req, res) => {
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
        return res.status(401).json({
          issue: " Unauthorized Admin!",
          details: "You are not authorized admin.",
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
          // Get the email admin email id for sign new login token
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
            message: "Login successful!",
            details:
              "Welcome to CBS Research Group's administrative dashboard.",
            authentication_sign: token,
          });
          // Check if email and password are not match then run this block of code
        } else {
          return res.status(401).json({
            issue: "Authentication failed!",
            details: "Email or password dosen't match",
          });
        }
      }
      // Check if all fields are not empty then block of code
    } else {
      // Check is the email exist on database or not
      return res.status(400).json({
        issue: "Bad Request!",
        details: "Email and password required.",
      });
    }
    // If there are any error in this code then this will executed
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: "Unable to proceed login process due to some technical problem.",
    });
  }
};

module.exports = loginAsAdminCtrl;
