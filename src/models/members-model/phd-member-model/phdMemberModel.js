/**
 * PhD Member Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This model defines the schema and structure for the PhD member
 * documents in the CBS Research Group's database. It manages records
 * of PhD members, including personal details, research interests, and
 * academic achievements.
 *
 * Usage:
 * Use this model to interact with PhD member data in the database.
 * It supports operations such as creating, reading, updating, and
 * deleting records, facilitating efficient management of PhD member
 * information.
 */

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Custom validator function to check for exactly 10 digits
const validatePhoneNumber = function (phone) {
  return /^\d{10}$/.test(phone); // Ensures the phone number is exactly 10 digits
};

const PhdMemberSchema = new Schema(
  {
    memberName: {
      type: String,
      required: true,
      maxlength: 25,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    profilePicturePublicId: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: validatePhoneNumber,
        message: "Phone number must be exactly 10 digits.",
      },
    },
    mscDoneFrom: {
      type: String,
      required: true,
    },
    bscDoneFrom: {
      type: String,
      required: true,
    },
    researchGateId: {
      type: String,
      required: true,
    },
    googleScholarId: {
      type: String,
      required: true,
    },
    currentYear: {
      type: String,
    },
    details: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const phdMemberModel = mongoose.model("phd-member-info", PhdMemberSchema);

module.exports = phdMemberModel;
