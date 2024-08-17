// Content: Get All MSC Members Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to send all msc members data to the client by request of users.

const mscMemberModel = require("../../../models/members-model/msc-member-model/mscMemberModel");

const getMscMembersCtrl = async (req, res) => {
  try {
    const getAllMscMembersInfo = await mscMemberModel.find();
    if (!getAllMscMembersInfo) {
      res.status(404).json({
        message: "Msc members are not available!",
      });
    } else {
      res.status(200).json(getAllMscMembersInfo);
    }
  } catch (error) {
    console.log("There is some technical error occared!", error);
    res.status(500).json({
      Error: error,
      Message: `Unable to find phd members info due to:${error.message}`,
    });
  }
};
module.exports = getMscMembersCtrl;
