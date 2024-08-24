/**
 * Publications Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 23/08/2024
 *
 * Description:
 * This model defines the schema and structure for publication documents
 * in the CBS Research Group's database. It manages records of research
 * publications, including details such as publication name, objectives,
 * timelines, and associated researchers.
 *
 * Usage:
 * Use this model to perform operations on publication data within the
 * database. It supports creating, reading, updating, and deleting
 * publication records, ensuring effective management of research publication
 * information.
 */

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
