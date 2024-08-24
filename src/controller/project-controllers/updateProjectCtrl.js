/**
 * Project Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This controller is responsible for updating existing project information in the
 * database. It processes requests to modify project details, ensuring that the
 * database reflects the most current data.
 *
 * Functionality:
 * - Receives update requests for specific projects from the client.
 * - Validates and processes the provided project data.
 * - Updates the corresponding project records in the database.
 * - Handles any errors or issues during the update process and returns appropriate
 *   responses.
 *
 * Usage:
 * Use this controller to update project details in response to client requests.
 * It ensures that project data remains accurate and up-to-date within the system.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const projectModel = require("../../models/projects-model/projectModel");

const updateProjectCtrl = async (req, res) => {
  const { id } = req.params;
  const { projectName, description, projectStatus } = req.body;

  try {
    const getPreviousProject = await projectModel.findById(id);
    if (!getPreviousProject) {
      return res.status(404).json({
        error: "Requested project are not exist!",
        message: "Please fill up all required fields",
      });
    } else {
      const newProjectName = projectName || getPreviousProject.projectName;
      const newProjectDescription =
        description || getPreviousProject.description;
      const newProjectStatus =
        projectStatus || getPreviousProject.projectStatus;

      const updatedProject = {
        projectName: newProjectName,
        description: newProjectDescription,
        projectStatus: newProjectStatus,
      };

      const updateProject = await projectModel.findByIdAndUpdate(
        id,
        updatedProject,
        { new: true }
      );

      if (!updateProject) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try after some time",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-labs/projects`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-labs/projects/${id}`
        );
        return res.status(200).json({
          message: "Requested project has been successfully updated!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to update project due to some technical error",
    });
  }
};
module.exports = updateProjectCtrl;
