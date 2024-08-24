/**
 * Get Current Logged-in Admin User Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 *
 * Description:
 * This controller handles the process of retrieving information about
 * the currently logged-in admin user of CBS Research Group. It processes
 * GET requests to provide details about the authenticated admin user.
 *
 * Functionality:
 * - Validates the request to ensure the user is authenticated.
 * - Retrieves the details of the currently logged-in admin user from the
 *   database.
 * - Returns the user information in the response, ensuring that sensitive
 *   data is handled securely.
 *
 * Usage:
 * Use this controller to handle requests for retrieving information about
 * the currently logged-in admin user. It provides a secure way to access
 * user details as part of the authentication and user management processes.
 */

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
