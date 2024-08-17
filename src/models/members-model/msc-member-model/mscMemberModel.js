// Content: PHD Member Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this model is to create a document object model for phd member to the database.

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

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
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      maxlength: 10,
    },
    bscDoneFrom: {
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

const mscMemberModel = mongoose.model("msc-member-info", MscMemberSchema);

module.exports = mscMemberModel;
