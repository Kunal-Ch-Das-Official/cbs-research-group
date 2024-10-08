/**
 * Database Connection Setup
 *
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 15/08/2024
 *
 * Description:
 * This configuration file is responsible for establishing a connection
 * between the server and the database. It ensures that the application
 * can interact with the database to perform CRUD operations efficiently.
 *
 * Usage:
 * - This file should be required in the server initialization script
 *   to establish a database connection before the server starts listening
 *   to requests.
 * - Ensure that the database credentials are stored securely and
 *   not hardcoded into the file.
 *
 * Notes:
 * - Update the connection string according to your database provider.
 * - Handle connection errors appropriately to avoid server crashes.
 */

// Import required modules
const mongoose = require('mongoose');
// Database connection string (ensure it's secure and configurable via environment variables)
const { dataBaseConnectionString } = require('./envConfig');

// Function to connect to the database
const dbConnectionConfig = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database connected successfully');
    });
    mongoose.connection.on('error', (err) => {
      console.log('Error occured in database system', err);
    });
    await mongoose.connect(dataBaseConnectionString, {});
  } catch (error) {
    console.log('Sorry we are unable to connecet to database', error);
    process.exit(1); // Exit process with failure
  }
};
// Export the connection function
module.exports = dbConnectionConfig;
