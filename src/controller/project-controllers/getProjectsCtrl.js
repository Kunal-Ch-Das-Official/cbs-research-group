/**
 * Get Projects Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles requests for retrieving project information from the
 * database. It processes client requests to fetch and send project data,
 * providing users with the necessary project details.
 *
 * Functionality:
 * - Receives a request from the client to access project information.
 * - Queries the database to retrieve the requested project data.
 * - Formats and sends the project data back to the client in response.
 * - Handles any errors or issues that occur during data retrieval and provides
 *   appropriate responses.
 *
 * Usage:
 * Use this controller to respond to client requests for project information.
 * It is essential for providing users with up-to-date and accurate details about
 * projects stored in the database.
 */

const projectModel = require("../../models/projects-model/projectModel");

const getProjectsCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getRequestedProject = await projectModel.findById(id);
      if (!getRequestedProject) {
        return res.status(404).json({
          error: "Requested project are not found!",
          message: "Please check the details!",
        });
      } else {
        return res.status(200).sendCachedData(getRequestedProject);
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
        return res.status(200).sendCachedData(getAllProjects);
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
