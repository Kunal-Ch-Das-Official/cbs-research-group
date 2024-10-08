/**
 * Send Rejected Response To Admin Requested User Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 22/08/2024
 *
 * Description:
 * This controller handles the process of sending a denial response to
 * users who have requested to become admin users of CBS Research Group.
 * It manages the communication to inform users that their request has been
 * rejected.
 *
 * Functionality:
 * - Receives and processes denial requests for admin user applications.
 * - Composes and sends a denial response to the user’s email or
 *   preferred communication channel.
 * - Ensures that the user is informed about the rejection of their request
 *   and any relevant reasons or next steps.
 * - Handles errors related to sending responses and provides appropriate
 *   feedback.
 *
 * Usage:
 * Use this controller to manage the sending of denial responses to
 * users whose requests to become admins have been rejected. It ensures
 * that users are properly notified about the status of their application
 * and any necessary follow-up.
 */

const adminRegistrationRequestMessageModel = require('../../models/admin-registration-request-model/adminRegisterRequestModel');
const sendAdminRegistrationDeniedMail = require('../../utils/nodemailer-mail-sender/sendAdminRegistrationDeniedMail');

// eslint-disable-next-line consistent-return
const sendDeniedResponseOfAdminRequestUserCtrl = async (req, res) => {
  const { id } = req.params;
  // const { reason } = req.body;

  try {
    const getRequestedUser =
      await adminRegistrationRequestMessageModel.findById(id);
    if (!getRequestedUser) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      const { reqUserName, reqUserEmail } = getRequestedUser;
      await sendAdminRegistrationDeniedMail(reqUserEmail, reqUserName, res);
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: 'Unable to perform this task due to some technical problem.',
    });
  }
};
module.exports = sendDeniedResponseOfAdminRequestUserCtrl;
