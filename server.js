/**
 * Server Entry Point
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 15/08/2024
 *
 * Description:
 * This file serves as the main entry point for the server application.
 * It is responsible for initializing and starting the server by setting up
 * the necessary components and configurations. It establishes a connection
 * to the database and listens on a specified port for incoming requests.
 *
 * Functionality:
 * - Imports the application and database connection configuration modules.
 * - Retrieves environment-specific settings such as the port number and
 *   running environment.
 * - Starts the server after successfully connecting to the database.
 * - Logs the server's status, including the port and environment information.
 *
 * Usage:
 * Execute this file to start the server. It will configure the server,
 * establish the database connection, and begin listening for requests on
 * the designated port.
 */

const app = require("./src/app");
const dbConnectionConfig = require("./src/config/dbConnectionConfig");
const { port, runningEnvironment } = require("./src/config/envConfig");

const startServer = async () => {
  // Requesting For Database Connection //
  await dbConnectionConfig();

  // Allocate Port Number For Listening //
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`Server environment: ${runningEnvironment}`);
  });
};
// Call Start Server Function //
startServer();
