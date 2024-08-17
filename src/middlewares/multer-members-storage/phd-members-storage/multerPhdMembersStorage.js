/* 
 Project Name: CBS-Research-Group-Backend,
 Author: Kunal Chandra Das,
 details : This is multer config file for phd members image upload.
 Date : 16/08/2024
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
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, WEBP, SVG, JPG, and GIF files are allowed."
      ),
      false
    );
  }
};

const phdMembersImageUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
module.exports = phdMembersImageUpload;
