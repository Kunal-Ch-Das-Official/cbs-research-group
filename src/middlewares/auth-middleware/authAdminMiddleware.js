// Content: JWT Validation Middleware.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this middleware is to validate jwt token of cbs-research-group admin user.

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
      console.log(
        `Unable to execute checkAdminAuth middleware due to:${error}`
      );
      return res.status(500).json({
        Error: error.message,
        Message: "Authorization failed.",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      error: "Unauthoraized user",
      message: "Token failed",
    });
  }
};

module.exports = checkAdminAuth;
