// Content: Personal Awards Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this model is to create a document object model for all personal awards to the database.

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TeamAwardSchema = new Schema(
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

const teamAwardsModel = mongoose.model("team-award", TeamAwardSchema);

module.exports = teamAwardsModel;
