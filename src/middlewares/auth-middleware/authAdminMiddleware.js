/**
 * JWT Validation Middleware
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This middleware is responsible for validating the JWT token
 * of the CBS Research Group admin user. It ensures that only
 * authenticated users with a valid token can access protected routes.
 *
 * Usage:
 * Include this middleware in any route that requires authentication.
 * The middleware will check the JWT token provided in the request headers
 * and verify its validity. If the token is valid, the request is allowed
 * to proceed; otherwise, an error response is returned.
 */

const jwt = require("jsonwebtoken");

const { jwtSecretKey } = require("../../config/envConfig");
const authAdminUserModel = require("../../models/auth-admin-model/authAdminUserModel");

const checkAdminAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // Verify token
      const { adminId } = jwt.verify(token, jwtSecretKey);
      // Get user from token

      req.adminUserName = await authAdminUserModel
        .findById(adminId)
        .select("-adminUserPassword");
      next();
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details: "Authorization failed.",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      issue: "Unauthoraized admin user!",
      details: "Admin authorization token invalid.",
    });
  }
};

module.exports = checkAdminAuth;
