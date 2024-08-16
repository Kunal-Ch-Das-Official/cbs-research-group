/* 
 Project Name: CBS-Research-Groups-Backend,
 Author: Kunal Chandra Das,
 Date : 15/08/2024
 Details: This is cloudinary(assets-management-tool) configuration file.
 */

const envConfig = require("./envConfig");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: envConfig.cloudinaryCloudName,
  api_key: envConfig.cloudinaryApiKey,
  api_secret: envConfig.cloudinaryCloudSecret,
});

const cloudinaryConfig = cloudinary;
module.exports = cloudinaryConfig;
