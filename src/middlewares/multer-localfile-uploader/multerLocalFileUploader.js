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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const random = uuidv4();
    cb(null, random + "" + file.originalname);
  },
});

// Define the file filter function
const fileFilter = (req, file, cb) => {
  // Accept only image files (jpeg, png, gif)
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

const multerLocalFileUploader = multer({
  storage: storage,
  fileFilter: fileFilter,
});
module.exports = multerLocalFileUploader;
