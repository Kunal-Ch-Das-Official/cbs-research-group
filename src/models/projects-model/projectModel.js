// Content: Projects Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this model is to create a document object model for projects of cbs research group to the database.

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectStatus: {
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

const projectModel = mongoose.model("project-info", ProjectSchema);
module.exports = projectModel;
