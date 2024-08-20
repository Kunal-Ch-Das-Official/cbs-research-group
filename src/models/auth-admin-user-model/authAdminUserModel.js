// Content:  Authenticate Admin Users Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this model is to create a document object model for admin user of cbs research group to the database.

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
