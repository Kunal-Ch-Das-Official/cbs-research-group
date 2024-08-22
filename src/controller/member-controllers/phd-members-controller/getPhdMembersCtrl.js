// Content: Get All PHD Members Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to send all phd members data to the client by request of users.

const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");

const getPhdMembersCtrl = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const getSinglePhdMemberInfo = await phdMemberModel.findById(id);
      if (!getSinglePhdMemberInfo) {
        return res.status(404).json({
          error: "Requested resources are not found!",
          message: "Please check the given details.",
        });
      } else {
        return res.status(200).json(getSinglePhdMemberInfo);
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
      const getAllPhdMembersInfo = await phdMemberModel.find();
      if (!getAllPhdMembersInfo) {
        return res.status(404).json({
          message: "Phd members are not available!",
        });
      } else {
        return res.status(200).json(getAllPhdMembersInfo);
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
module.exports = getPhdMembersCtrl;
