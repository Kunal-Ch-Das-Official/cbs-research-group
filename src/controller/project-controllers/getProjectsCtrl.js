// Content: Get Projects Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: Role of this controller is to send project data to the client by request of users.

const projectModel = require("../../models/projects-model/projectModel");

const getProjectsCtrl = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const getRequestedProject = await projectModel.findById(id);
      if (!getRequestedProject) {
        return res.status(404).json({
          error: "Requested project are not found!",
          message: "Please check the details!",
        });
      } else {
        return res.status(200).json(getRequestedProject);
      }
    } catch (error) {
      console.log(
        "Unable to get requested project due to internal server error",
        error
      );
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to get single project due to some technical error",
      });
    }
  } else {
    try {
      const getAllProjects = await projectModel.find();
      if (!getAllProjects) {
        return res.status(404).json({
          error: "Requested projects are not available!",
          message: "Upload a project info first!",
        });
      } else {
        return res.status(200).json(getAllProjects);
      }
    } catch (error) {
      console.log("Unable to get projects due to internal server error", error);
      return res.status(500).json({
        Error: error.message,
        Message: "Unable to get the projects due to some technical error!",
      });
    }
  }
};
module.exports = getProjectsCtrl;
