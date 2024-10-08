/**
 * Project Name: CBS-Research-Groups-Backend
 * Author      : Kunal Chandra Das
 * Date        : 15/08/2024
 *
 * Details     : This file contains the configuration settings for Cloudinary,
 *               an assets management tool.
 */

const {
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryCloudSecret,
} = require('./envConfig');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryCloudSecret,
});

const cloudinaryConfig = cloudinary;
module.exports = cloudinaryConfig;
