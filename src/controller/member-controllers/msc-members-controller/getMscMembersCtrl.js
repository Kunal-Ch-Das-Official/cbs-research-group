/**
 * Get MSC Members Info From Client Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 17/08/2024
 *
 * Description:
 * This controller handles the retrieval and sending of all MSC members' data
 * to the client based on a user request. It ensures that comprehensive and up-to-date
 * information about MSC members is provided as needed.
 *
 * Functionality:
 * - Receives a request from the client to get all MSC members' data.
 * - Retrieves the complete list of MSC members from the database.
 * - Formats the data and sends it back to the client in response to the request.
 * - Handles any errors that may occur during the data retrieval process.
 *
 * Usage:
 * Use this controller to provide a complete dataset of MSC members to the client.
 * This is useful for generating reports, displaying comprehensive member lists,
 * or any other functionality that requires full MSC members' information.
 */

const mscMemberModel = require('../../../models/members-model/msc-member-model/mscMemberModel');

const getMscMembersCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getSingleMscMemberInfo = await mscMemberModel.findById(id);
      if (!getSingleMscMemberInfo) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getSingleMscMemberInfo);
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
      const getAllMscMembersInfo = await mscMemberModel.find();
      if (!getAllMscMembersInfo) {
        return res.status(404).json({
          issue: 'Not found!',
          details: 'Requested resources are not found.',
        });
      } else {
        return res.status(200).json(getAllMscMembersInfo);
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
module.exports = getMscMembersCtrl;
