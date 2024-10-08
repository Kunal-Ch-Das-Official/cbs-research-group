/**
 * Delete Specific Contact Info By Client Admin Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This controller handles the deletion of a specific contact information record
 * based on an admin request. It ensures that the contact info is removed from
 * the database as requested by an authorized administrator.
 *
 * Functionality:
 * - Receives and processes deletion requests for individual contact info records.
 * - Validates the request to ensure that the admin has the necessary permissions.
 * - Deletes the specified contact info record from the database.
 * - Provides appropriate responses for successful deletions or errors.
 *
 * Usage:
 * Use this controller to remove specific contact information records from the
 * database when requested by an authorized admin. It ensures secure and accurate
 * deletion of contact info records.
 */

const contactFormModel = require('../../models/contact-form-model/contactFormModel');

const deleteContactInfoCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequiredContactInfo = await contactFormModel.findById(id);
    if (!getRequiredContactInfo) {
      return res.status(404).json({
        issue: 'Not found!',
        details: 'Requested resources are not found.',
      });
    } else {
      const deleteReqContactInfo = await contactFormModel.findByIdAndDelete(id);
      if (!deleteReqContactInfo) {
        return res.status(501).json({
          issue: 'Not implemented!',
          details: 'Something went wrong, please try again later.',
        });
      } else {
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
module.exports = deleteContactInfoCtrl;
