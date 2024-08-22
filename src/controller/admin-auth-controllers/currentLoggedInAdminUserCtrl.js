// Content: Get Current Loggedin Admin User Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this controller is for handle get request of current logged in admin user of cbs research groups.

const getCurrentLoggedInAdminUserCtrl = async (req, res) => {
  try {
    if (req.adminUserName) {
      return res.status(200).json({
        logged_in_user: req.adminUserName,
      });
    } else {
      return res.status(400).json({
        error: "Bad Request!",
        message: "Request is not valid",
      });
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      message: "Unable to perform this operation due to some technical problem",
    });
  }
};

module.exports = getCurrentLoggedInAdminUserCtrl;
