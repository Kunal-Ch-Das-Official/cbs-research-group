/* 
Content: Single Image Upload Receiver.
 Project Name: CBS-Research-Group-Backend,
 Author: Kunal Chandra Das,
 details : This is multer config file for single image upload handler.
 Date : 17/08/2024
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