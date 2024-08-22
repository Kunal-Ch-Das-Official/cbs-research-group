// Content: See Register As Admin Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 22/08/2024
// Details: Role of this controller is to get message of willing user of become admin

const adminRegistrationRequestMessageModel = require("../../models/admin-registration-request-model/adminRegisterRequestModel");

const getAdminRegisterRequestCtrl = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const getSingleRequestInfo =
        await adminRegistrationRequestMessageModel.findById(id);
      if (!getSingleRequestInfo) {
        return res.status(404).json({
          error: "Requested resources are not found!",
          message: "Please check the details before search",
        });
      } else {
        return res.status(200).json(getSingleRequestInfo);
      }
    } else {
      const getAllRequestInfo =
        await adminRegistrationRequestMessageModel.find();
      if (!getAllRequestInfo) {
        return res.status(404).json({
          error: "No requested available!",
        });
      } else {
        return res.status(200).json(getAllRequestInfo);
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to perform this task due to some technical error.",
    });
  }
};
module.exports = getAdminRegisterRequestCtrl;
