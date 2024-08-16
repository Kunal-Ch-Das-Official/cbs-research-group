/* 
 Project Name: CBS-Research-Groups-Backend,
 Author: Kunal Chandra Das,
 Date : 16/08/2024
 Details: This is custom file cleaner. it's a reuseable file unlink module. for delete local image from directory.
 */
const fs = require("fs");

// Helper function for file cleanup
const cleanupFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Unable to remove file, due to:", err);
    } else {
      console.log("File has been successfully removed!!");
    }
  });
};
module.exports = cleanupFile;
