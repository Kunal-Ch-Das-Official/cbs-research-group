// Content: Lab Instruments Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this model is to create a document object model for lab instrumnets to the database.

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const LabInstrumentsSchema = new Schema(
  {
    instrumentName: {
      type: String,
      required: true,
    },
    instrumentImage: {
      type: String,
      required: true,
    },
    instrumentImagePublicId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const labInstrumentModel = mongoose.model(
  "lab-instrument",
  LabInstrumentsSchema
);

module.exports = labInstrumentModel;
