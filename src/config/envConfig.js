/**********************************************************************
 * Project: CBS-Research-Group-Backend
 * File: server-config.js
 * Author: Kunal Chandra Das
 * Date: 15/08/2024
 *
 * Description:
 * This configuration file is responsible for loading environment
 * variables from the `.env` file using the `dotenv` package and
 * storing them in an object. This object is then exported for use
 * throughout the application to access environment-specific variables.
 **********************************************************************/

require("dotenv").config();

// Creting custom environment for server //
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

  mainEmailHostProtocol: process.env.MAIN_EMAIL_HOST_PROTOCOL,
  mainEmailPort: process.env.MAIN_EMAIL_PORT,
  mainEmailHostUser: process.env.MAIN_EMAIL_HOST_USER,
  mainEmailHostPassword: process.env.MAIN_EMAIL_HOST_PASSWORD,

  supportEmailHostProtocol: process.env.SUPPORT_EMAIL_HOST_PROTOCOL,
  supportEmailPort: process.env.SUPPORT_EMAIL_PORT,
  supportEmailHostUser: process.env.SUPPORT_EMAIL_HOST_USER,
  supportEmailHostPassword: process.env.SUPPORT_EMAIL_HOST_PASSWORD,
};

const envConfig = Object.freeze(environment);
module.exports = envConfig;

/**********************************************************************
 * Usage:
 * This configuration file can be required in any part of the application
 * to access the environment variables, ensuring that the application
 * behaves according to the specified environment settings.
 *
 * Example:
 * const config = require('./envConfig');
 * console.log(`Running in ${envConfig.NODE_ENV} mode on port ${envConfig.PORT}`);
 **********************************************************************/
