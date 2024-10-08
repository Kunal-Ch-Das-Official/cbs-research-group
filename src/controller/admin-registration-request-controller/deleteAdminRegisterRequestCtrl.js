/**
 * Delete Register As Admin Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 22/08/2024
 *
 * Description:
 * This controller handles the process of deleting or rejecting requests
 * from users who wish to become admin users of CBS Research Group. It
 * manages the removal of such requests from the system.
 *
 * Functionality:
 * - Processes requests to delete or reject admin registration requests.
 * - Validates the request to ensure proper identification of the user or
 *   request.
 * - Handles the removal of the request from the database or system.
 * - Provides appropriate responses for successful and failed request
 *   deletions.
 *
 * Usage:
 * Use this controller to manage the deletion or rejection of admin
 * registration requests. It ensures that the system properly handles
 * requests to become an admin user.
 */

const adminRegistrationRequestMessageModel = require('../../models/admin-registration-request-model/adminRegisterRequestModel');

const deleteAdminRegisterRequestMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const getRequestedUserMessage =
      await adminRegistrationRequestMessageModel.findById(id);

    if (!getRequestedUserMessage) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested message are not found please check the details.',
      });
    } else {
      const deleteMessage =
        await adminRegistrationRequestMessageModel.findByIdAndDelete(id);
      if (!deleteMessage) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        return res.status(200).json({
          details: 'Requested message has been successfully removed!',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: 'Unable to perform this task due to some technical problem',
    });
  }
};

module.exports = deleteAdminRegisterRequestMessage;
