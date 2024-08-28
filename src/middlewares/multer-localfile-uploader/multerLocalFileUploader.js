/**
 * Multer File Upload Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
 * Description:
 * This configuration file sets up Multer for handling image uploads
 * within the CBS Research Group backend. It defines the storage
 * destination, filename formatting, and file filter for image uploads.
 *
 * Usage:
 * Use this configuration in routes that require image upload functionality.
 * It handles the file storage and validation processes, ensuring that only
 * valid image files are uploaded and stored in the specified directory.
 */
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Configure memory storage
const storage = multer.memoryStorage();

// Define the file filter function
const fileFilter = (req, file, cb) => {
  // Accept only image files (jpeg, png, gif) and pdf
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, WEBP, SVG, JPG, PDF, and GIF files are allowed."
      ),
      false
    );
  }
};

// Create multer instance with memory storage
const multerMemoryUploader = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = multerMemoryUploader;
