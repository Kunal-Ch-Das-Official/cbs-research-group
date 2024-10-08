/**
 * MSC Member Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This model defines the schema and structure for the MSC member
 * documents in the CBS Research Group's database. It is responsible
 * for creating and managing records of MSC members, including fields
 * for personal details, research information, and academic achievements.
 *
 * Usage:
 * Use this model to interact with MSC member data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * MSC member records, ensuring efficient management of member information.
 */

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Custom validator function to check for exactly 10 digits
const validatePhoneNumber = function (phone) {
  return /^\d{10}$/.test(phone); // Ensures the phone number is exactly 10 digits
};

const MscMemberSchema = new Schema(
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
        message: 'Phone number must be exactly 10 digits.',
      },
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

const mscMemberModel = mongoose.model('msc-member-info', MscMemberSchema);

module.exports = mscMemberModel;
