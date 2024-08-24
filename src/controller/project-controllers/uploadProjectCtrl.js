/**
 * Project Upload Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This controller handles the process of uploading new project details to the
 * database. It is responsible for receiving project data from the client and
 * saving it to the database to ensure the system has the most recent and relevant
 * information about projects.
 *
 * Functionality:
 * - Receives upload requests for new project details from the client.
 * - Validates the incoming project data to ensure it meets required standards.
 * - Inserts the new project records into the database.
 * - Handles any errors during the upload process and provides appropriate responses.
 *
 * Usage:
 * Use this controller to add new project details to the database. It supports
 * the inclusion of various attributes related to projects, ensuring the database
 * is updated with new information as provided by the client.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
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
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-labs/projects`
        );

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
