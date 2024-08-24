/**
 * Custom Single Image Cleaner
 * Project: CBS-Research-Groups-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
 * Description:
 * This reusable function handles the deletion of a single image from
 * Cloudinary. It is designed to be used wherever an image needs to
 * be removed from the cloud storage.
 *
 * Usage:
 * Use this function to delete one image at a time from Cloudinary.
 * It requires the image's identifier or URL to locate and remove the
 * image from the cloud storage.
 */

const cloudinaryConfig = require("../../config/cloudinaryConfig");

const customSingleDestroyer = async (destroyerPublicId) => {
  try {
    await cloudinaryConfig.uploader.destroy(destroyerPublicId).then(() => {
      console.log({
        message: "Requested file has been removed from cloudinary!",
        messageOrigin: "custom single destroyer.",
      });
    });
  } catch (error) {
    console.log({
      Issue: error.message,
      message: "Unable to destroy requested resources!",
      messageOrigin: "custom single destroyer.",
    });
  }
};
module.exports = customSingleDestroyer;
