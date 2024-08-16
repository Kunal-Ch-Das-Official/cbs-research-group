// Content: Server Entry Point.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: This is the only entry point of the server and root of application server.

const app = require("./src/app");
const dbConnectionConfig = require("./src/config/dbConnectionConfig");
const envConfig = require("./src/config/envConfig");

const startServer = async () => {
  // Requesting For Database Connection //
  await dbConnectionConfig();

  // Allocate Port Number For Listening //
  app.listen(envConfig.port, () => {
    console.log(`Server is running on port:${envConfig.port}`);
  });
};
// Call Start Server Function //
startServer();
