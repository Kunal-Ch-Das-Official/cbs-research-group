/* 
 Project Name: CBS-Research-Groups-Backend,
 Content: Custom Single Image uploader
 Author: Kunal Chandra Das,
 Date : 17/08/2024
 Details: This is a reuseable function for upload one image at a time to cloudinary.
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
      error: "Internal server error!",
      origin: "Custom single uploader.",
      errorOrigin: "Second block/Catch block",
      errorId: "#-02",
    });
    return null;
  }
};
module.exports = customSingleUploader;
