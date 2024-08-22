// Content: Send denied Response To Admin Requested User Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 22/08/2024
// Details: Role of this controller is to send the denied response who willing user of become admin

const adminRegistrationRequestMessageModel = require("../../models/admin-registration-request-model/adminRegisterRequestModel");
const sendAdminRegistrationDeniedMail = require("../../utils/nodemailer-mail-sender/sendAdminRegistrationDeniedMail");

const sendDeniedResponseOfAdminRequestUserCtrl = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const getRequestedUser =
      await adminRegistrationRequestMessageModel.findById(id);
    if (!getRequestedUser) {
      return res.status(404).json({
        error: "Requested user not found",
        message: "Please check the details",
      });
    } else {
      const { reqUserName, reqUserEmail } = getRequestedUser;
      await sendAdminRegistrationDeniedMail(
        reqUserEmail,
        reqUserName,
        reason,
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
module.exports = sendDeniedResponseOfAdminRequestUserCtrl;
