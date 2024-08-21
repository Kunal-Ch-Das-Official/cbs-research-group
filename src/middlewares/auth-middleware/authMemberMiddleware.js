// Content: JWT Validation Middleware.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this middleware is to validate jwt token of cbs-research-group admin user.

const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../config/envConfig");
const authMemberModel = require("../../models/auth-user-model/auth-member-model/authMemberModel");

const checkMemberAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { memberId } = jwt.verify(token, jwtSecretKey);
      req.userName = await authMemberModel
        .findById(memberId)
        .select("-userPassword");
      next();
    } catch (error) {
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
module.exports = checkMemberAuth;
