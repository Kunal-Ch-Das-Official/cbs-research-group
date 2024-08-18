// Content: Group News Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 18/08/2024
// Details: Role of this model is to create a document object model for group news to the database.

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GroupNewsSchema = new Schema(
  {
    newsTitle: {
      type: String,
      require: true,
    },
    content: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// latest group news model. model name is (latest-group-new) cause it will be latest-group-news after creation
const groupNewsModel = mongoose.model("latest-group-new", GroupNewsSchema);
module.exports = groupNewsModel;
