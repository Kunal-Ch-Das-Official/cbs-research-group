/**
 * Get All logged in admin user
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 01/10/2024
 *
 * Description:
 * This controller handles the process of retrieving and sending all logged in
 * admin user information to the client based on user requests. It provides a
 * comprehensive view of all  all logged in admin users data as requested.
 *
 * Functionality:
 * - Receives and processes requests to retrieve logged in admin users information.
 * - Queries the database to gather all relevant logged in admin users  data.
 * - Sends the collected logged in admin users  data to the client.
 * - Provides appropriate responses for successful and failed data retrieval.
 *
 * Usage:
 * Use this controller to manage client requests for retrieving and viewing
 * all logged in admin users  information. It ensures that clients receive accurate and
 * complete data regarding logged in admin users.
 */

const authAdminUserModel = require('../../models/auth-admin-model/authAdminUserModel');

const getAllLoginAdminCtrl = async (req, res) => {
  try {
    const getAllLoginAdminUser = await authAdminUserModel.find();
    if (!getAllLoginAdminUser) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      return res.status(200).json(getAllLoginAdminUser);
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to find requested resources due to some technical problem.',
    });
  }
};
module.exports = getAllLoginAdminCtrl;
