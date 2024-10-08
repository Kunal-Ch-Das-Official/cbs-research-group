/**
 * Become Admin Users Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This model defines the schema and structure for documents related
 * to users who request to become admin users in the CBS Research Group's
 * database. It manages records of user requests for admin access, including
 * details such as user information, request status, and approval history.
 *
 * Usage:
 * Use this model to manage data related to user requests for admin roles.
 * It supports operations such as creating, reading, updating, and deleting
 * request records, facilitating the management of admin user applications.
 */

const { Schema, default: mongoose } = require('mongoose');

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
  'admin-registration-request',
  AdminRegisterMessageSchema
);
module.exports = adminRegistrationRequestMessageModel;
