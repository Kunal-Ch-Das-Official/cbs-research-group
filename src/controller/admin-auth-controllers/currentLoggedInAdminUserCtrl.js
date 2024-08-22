// Content: Get Current Loggedin Admin User Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 20/08/2024
// Details: Role of this controller is for handle get request of current logged in admin user of cbs research groups.

const getCurrentLoggedInAdminUserCtrl = async (req, res) => {
  return res.status(200).json({
    logged_in_user: req.adminUserName,
  });
};

module.exports = getCurrentLoggedInAdminUserCtrl;
