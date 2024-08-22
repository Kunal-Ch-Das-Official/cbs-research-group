// Content: Server environment configuration.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: Role of this config file is to get all env variable from dotenv file and store it to an object, then send the object for use as a environment.

require("dotenv").config();

// Creting Custom Environment For Server //
const environment = {
  port: process.env.PORT,
  runningEnvironment: process.env.NODE_ENV,
  dataBaseConnectionString: process.env.DATABASE_CONNECTION_STRING,
  cloudinaryConnectionString: process.env.CLOUDINARY_URL,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryCloudSecret: process.env.CLOUDINARY_CLOUD_SECRET,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  clientSideUrl: process.env.CLIENT_SIDE_URL,

  emailHostProtocol: process.env.EMAIL_HOST_PROTOCOL,
  emailPort: process.env.EMAIL_PORT,
  emailHostUser: process.env.EMAIL_HOST_USER,
  emailHostPassword: process.env.EMAIL_HOST_PASSWORD,
};

const envConfig = Object.freeze(environment);
module.exports = envConfig;
