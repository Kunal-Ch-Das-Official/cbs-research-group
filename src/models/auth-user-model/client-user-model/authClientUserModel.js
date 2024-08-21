// Content:  Authenticate Admin Users Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this model is to create a document object model for admin user of cbs research group to the database.

const { Schema, default: mongoose } = require("mongoose");

const AuthClientUserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userPassword: {
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

const authClientUserModel = mongoose.model(
  "authenticate-user",
  AuthClientUserSchema
);
module.exports = authClientUserModel;
