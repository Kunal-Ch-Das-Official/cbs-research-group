/**
 * Get Contact Info From Admin Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles requests to retrieve all contact form information.
 * It provides the requested contact info to the admin who has made the request.
 *
 * Functionality:
 * - Processes requests from admins to fetch contact form information.
 * - Retrieves all relevant contact form data from the database.
 * - Ensures that the admin requesting the information has the appropriate permissions.
 * - Returns the contact info data to the admin in response to their request.
 *
 * Usage:
 * Use this controller to provide admins with access to all contact form submissions
 * when they request it. It ensures that only authorized admins can access the contact info.
 */

const contactFormModel = require('../../models/contact-form-model/contactFormModel');

const getContactInfoCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getRequestedContactInfo = await contactFormModel.findById(id);
      if (!getRequestedContactInfo) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getRequestedContactInfo);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to find requested resources due to some technical problem.',
      });
    }
  } else {
    try {
      const getAllRequestedContactInfo = await contactFormModel.find();
      if (!getAllRequestedContactInfo) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getAllRequestedContactInfo);
      }
    } catch (error) {
      return res.status(500).json({
        issue: error.message,
        details:
          'Unable to find requested resources due to some technical problem.',
      });
    }
  }
};
module.exports = getContactInfoCtrl;
