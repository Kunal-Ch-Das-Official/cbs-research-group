/* 
 Project Name: CBS-Research-Groups-Backend,
 Content: Custom Single Image Cleaner
 Author: Kunal Chandra Das,
 Date : 17/08/2024
 Details: This is a reuseable function for delete one image at a time to cloudinary.
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
      message: "Unable to destroy requested resources!",
      messageOrigin: "custom single destroyer.",
    });
  }
};
module.exports = customSingleDestroyer;
