// Content: Database Conncection Setup.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: Role of this config file is to establish connection between server and database.

const mongoose = require("mongoose");
const { dataBaseConnectionString } = require("./envConfig");

// Data Base Connection Controller //
const dbConnectionConfig = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error occured in database system", err);
    });
    await mongoose.connect(dataBaseConnectionString, {});
  } catch (error) {
    console.log("Sorry we are unable to connecet to database", error);
    process.exit(1);
  }
};
module.exports = dbConnectionConfig;
