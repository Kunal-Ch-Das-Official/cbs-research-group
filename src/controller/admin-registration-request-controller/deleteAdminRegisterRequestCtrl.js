// Content: Delete Register As Admin Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 22/08/2024
// Details: Role of this controller is to get message of willing user of become admin

const adminRegistrationRequestMessageModel = require("../../models/admin-registration-request-model/adminRegisterRequestModel");

const deleteAdminRegisterRequestMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const getRequestedUserMessage =
      await adminRegistrationRequestMessageModel.findById(id);

    if (!getRequestedUserMessage) {
      return res.status(404).json({
        error: "Requested message not found!",
        message: "Please check the details ",
      });
    } else {
      const deleteMessage =
        await adminRegistrationRequestMessageModel.findByIdAndDelete(id);
      if (!deleteMessage) {
        return res.status(500).json({
          error: "Unable to delete message due to some technical error!",
        });
      } else {
        return res.status(200).json({
          message: "Requested message has been successfully removed",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to perform this task due to some technical error",
    });
  }
};

module.exports = deleteAdminRegisterRequestMessage;
