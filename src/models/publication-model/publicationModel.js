// Content: Projects Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 23/08/2024
// Details: Role of this model is to create a document object model for projects of cbs research group to the database.

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PublicationSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    contributer: {
      type: String,
      required: true,
    },
    aboutPublication: {
      type: String,
      required: true,
    },
    publicationThumbnail: {
      type: String,
      require: true,
    },
    publicationThumbnailPublicId: {
      type: String,
      require: true,
    },
    firstOverview: {
      type: String,
      require: true,
    },
    firstOverviewPublicId: {
      type: String,
      require: true,
    },
    secondOverview: {
      type: String,
      require: true,
    },
    secondOverviewPublicId: {
      type: String,
      require: true,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    pdfLink: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const publicationModel = mongoose.model("publication-info", PublicationSchema);
module.exports = publicationModel;
