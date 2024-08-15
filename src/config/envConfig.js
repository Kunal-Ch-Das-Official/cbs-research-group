// Content: Server environment configuration.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024

require("dotenv").config();

// Creting Custom Environment For Server //
const environment = {
  port: process.env.PORT,
  dataBaseConnectionString: process.env.DATABASE_CONNECTION_STRING,
};

const envConfig = Object.freeze(environment);
module.exports = envConfig;
