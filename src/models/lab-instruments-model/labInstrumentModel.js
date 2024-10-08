/**
 * Lab Instruments Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This model defines the schema and structure for the lab instruments
 * documents in the CBS Research Group's database. It is responsible
 * for creating and managing records of lab instruments, including fields
 * for instrument details, specifications, and usage information.
 *
 * Usage:
 * Use this model to interact with lab instruments data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * instrument records, facilitating effective management of lab equipment information.
 */

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

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
  'lab-instrument',
  LabInstrumentsSchema
);

module.exports = labInstrumentModel;
