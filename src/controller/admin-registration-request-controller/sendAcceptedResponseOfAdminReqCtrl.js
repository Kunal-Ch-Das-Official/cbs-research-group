// Content: Send Accepted Response To Admin Requested User Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 22/08/2024
// Details: Role of this controller is to send the response who willing user of become admin

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
