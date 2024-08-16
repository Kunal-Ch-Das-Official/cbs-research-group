// Content: Server environment configuration.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: Role of this config file is to get all env variable from dotenv file and store it to an object, then send the object for use as a environment.

require("dotenv").config();

// Creting Custom Environment For Server //
const environment = {
  port: process.env.PORT,
  dataBaseConnectionString: process.env.DATABASE_CONNECTION_STRING,
  cloudinaryConnectionString: process.env.CLOUDINARY_URL,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryCloudSecret: process.env.CLOUDINARY_CLOUD_SECRET,
};

const envConfig = Object.freeze(environment);
module.exports = envConfig;
