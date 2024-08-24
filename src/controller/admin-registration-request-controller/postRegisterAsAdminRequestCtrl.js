// Content: Register As Admin Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: Role of this controller is to handle message of willing user of become admin

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const adminRegistrationRequestMessageModel = require("../../models/admin-registration-request-model/adminRegisterRequestModel");
const authAdminUserModel = require("../../models/auth-admin-model/authAdminUserModel");

const postRegisterAsAdminRequestCtrl = async (req, res) => {
  const { reqUserName, reqUserEmail, message, termsAndConditions } = req.body;
  try {
    if (reqUserName && reqUserEmail && termsAndConditions) {
      const getCurrentAdminInfo = await authAdminUserModel.findOne({
        adminUserEmail: reqUserEmail,
      });
      if (getCurrentAdminInfo) {
        res.status(400).json({
          error: "Bad Request!",
          message: "Admin user already exist.",
        });
      } else {
        const storeRequest = new adminRegistrationRequestMessageModel({
          reqUserName: reqUserName,
          reqUserEmail: reqUserEmail,
          message: message,
          termsAndConditions: termsAndConditions,
        });
        const saveDetails = await storeRequest.save();
        if (!saveDetails) {
          return res.status(500).json({
            error:
              "Unable to send request due to some technical error. Try again later",
          });
        } else {
          clearCache(
            `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/register-request/admin`
          );
          return res.status(201).json({
            message: "Request has been successfully send",
          });
        }
      }
    } else {
      res.status(400).json({
        error: "Bad Request!",
        message: "All fields are require.",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
      Message: "Unable to send the request due to some technical error",
    });
  }
};
module.exports = postRegisterAsAdminRequestCtrl;
