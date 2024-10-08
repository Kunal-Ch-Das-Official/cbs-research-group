/**
 * See Register As Admin Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 22/08/2024
 *
 * Description:
 * This controller handles the process of retrieving and viewing requests
 * from users who wish to become admin users of CBS Research Group. It
 * manages the retrieval of these registration requests from the system.
 *
 * Functionality:
 * - Processes requests to view admin registration requests.
 * - Retrieves details of users who have applied to become admin users.
 * - Provides the necessary information for further review or action.
 * - Handles errors and provides appropriate responses.
 *
 * Usage:
 * Use this controller to manage the viewing and retrieval of admin
 * registration requests. It ensures that the system can effectively
 * review and process user requests to become admins.
 */

const adminRegistrationRequestMessageModel = require('../../models/admin-registration-request-model/adminRegisterRequestModel');
const getAdminRegisterRequestCtrl = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const getSingleRequestInfo =
        await adminRegistrationRequestMessageModel.findById(id);
      if (!getSingleRequestInfo) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Please check the details, and try it again.',
        });
      } else {
        return res.status(200).json(getSingleRequestInfo);
      }
    } else {
      const getAllRequestInfo =
        await adminRegistrationRequestMessageModel.find();
      if (!getAllRequestInfo) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not available.',
        });
      } else {
        return res.status(200).json(getAllRequestInfo);
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: 'Unable to perform this task due to some technical problem.',
    });
  }
};
module.exports = getAdminRegisterRequestCtrl;
