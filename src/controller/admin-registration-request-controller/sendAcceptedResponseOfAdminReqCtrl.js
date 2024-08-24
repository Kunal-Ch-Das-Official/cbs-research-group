/**
 * Send Accepted Response To Admin Requested User Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 22/08/2024
 *
 * Description:
 * This controller handles the process of sending an acceptance response
 * to users who have requested to become admin users of CBS Research Group.
 * It manages the communication to inform users that their request has been
 * approved.
 *
 * Functionality:
 * - Receives and processes acceptance requests for admin user applications.
 * - Composes and sends an acceptance response to the user’s email or
 *   preferred communication channel.
 * - Ensures that the user is informed about the approval of their request
 *   and any next steps.
 * - Handles errors related to sending responses and provides appropriate
 *   feedback.
 *
 * Usage:
 * Use this controller to manage the sending of acceptance responses to
 * users whose requests to become admins have been approved. It ensures
 * that users are properly notified and informed about their application
 * status.
 */

const adminRegistrationRequestMessageModel = require("../../models/admin-registration-request-model/adminRegisterRequestModel");
const sendAdminRegistrationSuccessMail = require("../../utils/nodemailer-mail-sender/sendAdminRegistrationSuccessMail");

const sendAcceptedResponseOfAdminRequestUserCtrl = async (req, res) => {
  const { id } = req.params;
  const { loginId, loginPassword } = req.body;
  try {
    const getUserInfo = await adminRegistrationRequestMessageModel.findById(id);
    if (!getUserInfo) {
      return res.status(404).json({
        error: "Requested resources are not found!",
        message: "Please check the info",
      });
    } else {
      const { reqUserName, reqUserEmail } = getUserInfo;
      await sendAdminRegistrationSuccessMail(
        reqUserEmail,
        reqUserName,
        loginId,
        loginPassword,
        res
      );
    }
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to perform this task due to some technical error",
    });
  }
};
module.exports = sendAcceptedResponseOfAdminRequestUserCtrl;
