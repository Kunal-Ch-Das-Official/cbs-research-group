/**
 * Projects Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This model defines the schema and structure for project documents
 * in the CBS Research Group's database. It is responsible for managing
 * records of research projects, including project details, objectives,
 * timelines, and associated researchers.
 *
 * Usage:
 * Use this model to interact with project data in the database.
 * It supports operations such as creating, reading, updating, and
 * deleting project records, ensuring effective management of project information.
 */

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

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

const projectModel = mongoose.model('project-info', ProjectSchema);
module.exports = projectModel;
