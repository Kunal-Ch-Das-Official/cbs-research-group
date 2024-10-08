/**
 * Group News Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This model defines the schema and structure for the group news
 * documents in the CBS Research Group's database. It is responsible
 * for creating and managing records of group news, including fields for
 * news content, publication date, and related information.
 *
 * Usage:
 * Use this model to interact with group news data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * news records, ensuring efficient management of group news information.
 */

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

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
const groupNewsModel = mongoose.model('latest-group-new', GroupNewsSchema);
module.exports = groupNewsModel;
