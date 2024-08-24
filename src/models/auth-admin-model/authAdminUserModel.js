/**
 * Authenticate Admin Users Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This model defines the schema and structure for the admin user document
 * in the CBS Research Group's database. It is responsible for creating
 * and managing records for admin users, including fields for authentication
 * such as username, password, and roles.
 *
 * Usage:
 * Use this model to interact with admin user data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * admin user records, and includes methods for authentication and role management.
 */

const { Schema, default: mongoose } = require("mongoose");

const AuthAdminSchema = new Schema(
  {
    adminUserName: {
      type: String,
      required: true,
      trim: true,
    },
    adminUserEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    adminUserPassword: {
      type: String,
      required: true,
      trim: true,
    },
    termsAndConditions: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const authAdminUserModel = mongoose.model(
  "authenticate-admin",
  AuthAdminSchema
);
module.exports = authAdminUserModel;
