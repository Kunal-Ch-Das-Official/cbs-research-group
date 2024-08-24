// Content: Get All MSC Members Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to send all msc members data to the client by request of users.

const mscMemberModel = require("../../../models/members-model/msc-member-model/mscMemberModel");

const getMscMembersCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getSingleMscMemberInfo = await mscMemberModel.findById(id);
      if (!getSingleMscMemberInfo) {
        return res.status(404).json({
          message: "Msc member are not available!",
        });
      } else {
        return res.status(200).sendCachedData(getSingleMscMemberInfo);
      }
    } catch (error) {
      console.log("There is some technical error occared!", error);
      return res.status(500).json({
        Error: error,
        Message: `Unable to find phd member info due to:${error.message}`,
      });
    }
  } else {
    try {
      const getAllMscMembersInfo = await mscMemberModel.find();
      if (!getAllMscMembersInfo) {
        return res.status(404).json({
          message: "Msc members are not available!",
        });
      } else {
        return res.status(200).sendCachedData(getAllMscMembersInfo);
      }
    } catch (error) {
      console.log("There is some technical error occared!", error);
      return res.status(500).json({
        Error: error,
        Message: `Unable to find phd members info due to:${error.message}`,
      });
    }
  }
};
module.exports = getMscMembersCtrl;
