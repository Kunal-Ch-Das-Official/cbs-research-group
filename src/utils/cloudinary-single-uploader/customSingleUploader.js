/**
 * Custom Image Uploader to Cloudinary
 * Project: CBS-Research-Groups-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
 * Description:
 * This reusable function handles the uploading of images to Cloudinary.
 * It is designed to streamline the process of uploading images to cloud
 * storage, making it easier to integrate with various parts of the application.
 *
 * Usage:
 * Use this function to upload images to Cloudinary. It requires image
 * data and optionally any configuration settings needed for the upload.
 */

const cloudinaryConfig = require("../../config/cloudinaryConfig");

const customSingleUploader = async (requireFilePath, folderName) => {
  try {
    const storedDataInfo = await cloudinaryConfig.uploader.upload(
      requireFilePath,
      {
        folder: folderName,
      }
    );
    const storedDataAccessUrl = storedDataInfo.secure_url;
    const storedDataAccessId = storedDataInfo.public_id;
    return { storedDataAccessUrl, storedDataAccessId };
  } catch (error) {
    console.log({
      status: 500,
      issue: "Cloudinary uploader error!",
      issueOrigin: "Custom single uploader.",
      message: error.message,
    });
    return null;
  }
};
module.exports = customSingleUploader;
