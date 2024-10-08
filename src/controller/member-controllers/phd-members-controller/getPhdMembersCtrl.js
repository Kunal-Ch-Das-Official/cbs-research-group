/**
 * Get PHD Members Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
 * Description:
 * This controller handles requests to retrieve all PhD members' data from the database
 * and sends it to the client. It processes the request to fetch a comprehensive list of
 * PhD members' information as requested by users.
 *
 * Functionality:
 * - Receives a request to retrieve all PhD members' data from the client.
 * - Queries the database to retrieve the complete list of PhD members.
 * - Formats the data as needed and sends it to the client in the response.
 * - Handles any errors that may occur during the data retrieval process and returns
 *   appropriate responses to the client.
 *
 * Usage:
 * Use this controller to get and return all PhD members' information to the client. This
 * operation is useful for providing a full list of PhD members for display or processing
 * purposes as requested by users.
 */

const phdMemberModel = require('../../../models/members-model/phd-member-model/phdMemberModel');

const getPhdMembersCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getSinglePhdMemberInfo = await phdMemberModel.findById(id);
      if (!getSinglePhdMemberInfo) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getSinglePhdMemberInfo);
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
      const getAllPhdMembersInfo = await phdMemberModel.find();
      if (!getAllPhdMembersInfo) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getAllPhdMembersInfo);
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
module.exports = getPhdMembersCtrl;
