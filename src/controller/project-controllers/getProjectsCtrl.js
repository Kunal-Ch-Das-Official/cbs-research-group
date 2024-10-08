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

const projectModel = require('../../models/projects-model/projectModel');

const getProjectsCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getRequestedProject = await projectModel.findById(id);
      if (!getRequestedProject) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getRequestedProject);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to find requested resources due to some technical problem.',
      });
    }
  } else {
    try {
      const getAllProjects = await projectModel.find();
      if (!getAllProjects) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getAllProjects);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to find requested resources due to some technical problem.',
      });
    }
  }
};
module.exports = getProjectsCtrl;
