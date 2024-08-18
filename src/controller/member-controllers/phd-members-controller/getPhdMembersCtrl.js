// Content: Get All PHD Members Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to send all phd members data to the client by request of users.

const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");

const getPhdMembersCtrl = async (req, res) => {
  try {
    const getAllPhdMembersInfo = await phdMemberModel.find();
    if (!getAllPhdMembersInfo) {
      res.status(404).json({
        message: "Phd members are not available!",
      });
    } else {
      res.status(200).json(getAllPhdMembersInfo);
    }
  } catch (error) {
    console.log("There is some technical error occared!", error);
    res.status(500).json({
      Error: error,
      Message: `Unable to find phd members info due to:${error.message}`,
    });
  }
};
module.exports = getPhdMembersCtrl;