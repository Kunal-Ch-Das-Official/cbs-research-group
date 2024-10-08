/**
 * Delete Logged In User Info By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 01/10/2024
 * Last update: 08/10/2024
 * Description:
 * This controller handles the deletion of a logged-in user's account from the database
 * based on a request from the client.
 *
 * Functionality:
 * - Receives requests to delete a user's account.
 * - Validates the request to ensure it contains the necessary authentication details.
 * - Deletes the specified user account from the database.
 * - Handles any errors that may occur during the deletion process.
 *
 * Usage:
 * Use this controller to remove individual user accounts from the database
 * as requested by clients. It ensures that outdated or incorrect user data can be efficiently
 * managed and removed as needed.
 */

const authAdminUserModel = require('../../models/auth-admin-model/authAdminUserModel');
const { dashboardCache } = require('../dashboard-controllers/getAllData');
const { allLoggedInUserDataCache } = require('./getAllLoginAdminCtrl');

const removeAdminAccountCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequestedAccount = await authAdminUserModel.findById(id);

    if (!getRequestedAccount) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      const deleteRequestedAccount = await authAdminUserModel.findByIdAndDelete(
        id
      );
      if (!deleteRequestedAccount) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
        allLoggedInUserDataCache.del('all_logged_in_admin');
        dashboardCache.del('aggregated_data');
        return res.status(200).json({
          details: 'Requested resources has been successfully removed!',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details:
        'Unable to delete requested resources due to some technical problem.',
    });
  }
};
module.exports = removeAdminAccountCtrl;
