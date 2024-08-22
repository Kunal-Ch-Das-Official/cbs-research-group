// Content:  Authenticate Admin Users Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this model is to create a document object model for admin user of cbs research group to the database.

const { Schema, default: mongoose } = require("mongoose");

const AdminRegisterMessageSchema = new Schema(
  {
    reqUserName: {
      type: String,
      required: true,
      trim: true,
    },
    reqUserEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    message: {
      type: String,
    },
    termsAndConditions: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const adminRegistrationRequestMessageModel = mongoose.model(
  "admin-registration-request",
  AdminRegisterMessageSchema
);
module.exports = adminRegistrationRequestMessageModel;
