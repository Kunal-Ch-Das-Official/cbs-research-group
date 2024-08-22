// Content: Project Upload Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this controller is to upload project details to the data base.

const projectModel = require("../../models/projects-model/projectModel");

const uploadProjectCtrl = async (req, res) => {
  const { projectName, description, projectStatus } = req.body;
  if (!req.body) {
    return res.status(400).json({
      error: "Bad Request!",
      message: "Please fill up all the fields carefully!",
    });
  } else {
    try {
      const projectDetails = new projectModel({
        projectName,
        description,
        projectStatus,
      });
      const uploadData = await projectDetails.save();
      if (!uploadData) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try it after some time",
        });
      } else {
        return res.status(201).json({
          message: "Project details has been successfully uploaded!",
        });
      }
    } catch (error) {
      console.log(`Unable to upload this data due to:${error}`);
      return res.status(500).json({
        Error: error.message,
        Message:
          "Unable to upload project details due to some technical error!",
      });
    }
  }
};
module.exports = uploadProjectCtrl;
