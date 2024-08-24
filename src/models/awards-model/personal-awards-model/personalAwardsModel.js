/**
 * Personal Awards Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This model defines the schema and structure for the personal awards
 * document in the CBS Research Group's database. It is responsible for
 * creating and managing records of personal awards, including fields for
 * award details, recipients, and dates.
 *
 * Usage:
 * Use this model to interact with personal awards data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * award records, ensuring efficient management of award information.
 */

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PersonalAwardSchema = new Schema(
  {
    awardTitle: {
      type: String,
      required: true,
    },
    recivedFor: {
      type: String,
      required: true,
    },
    recivedDate: {
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

const personalAwardsModel = mongoose.model(
  "personal-award",
  PersonalAwardSchema
);

module.exports = personalAwardsModel;
