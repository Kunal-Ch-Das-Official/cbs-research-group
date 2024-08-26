/**
 * Custom File Cleaner
 * Project: CBS-Research-Groups-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This reusable module provides functionality to delete local images
 * from a directory. It is designed to unlink and remove files, ensuring
 * that local storage remains clean and organized.
 *
 * Usage:
 * Use this module to remove local image files from the specified directory.
 * It handles file unlinking operations, making it easy to manage and clean
 * up image files as needed.
 */

const { unlink } = require("fs");

// Helper function for file cleanup
const cleanupFile = (filePath) => {
  unlink(filePath, (err) => {
    if (err) {
      console.log("Unable to remove file, due to:", err);
    } else {
      console.log("File has been successfully removed!");
    }
  });
};
module.exports = cleanupFile;
