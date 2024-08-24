// Content: Project Update Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 18/08/2024
// Details: Role of this controller is to update existing projects to the data base.

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
    console.log(
      "Unable to update project due to some internal server error!",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to update project due to some technical error",
    });
  }
};
module.exports = updateProjectCtrl;
