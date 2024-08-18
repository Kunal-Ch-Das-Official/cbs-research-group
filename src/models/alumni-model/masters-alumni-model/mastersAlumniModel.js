// Content: Master Alumni Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: Role of this model is to create a document object model for masters alumni to the database.

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MatersAlumniShema = new Schema(
  {
    alumniName: {
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
      type: Number,
      required: true,
      maxlength: 10,
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
    yearOfPassout: {
      type: String,
      required: true,
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

const mastersAlumniModel = mongoose.model(
  "masters-alumni-info",
  MatersAlumniShema
);
module.exports = mastersAlumniModel;
