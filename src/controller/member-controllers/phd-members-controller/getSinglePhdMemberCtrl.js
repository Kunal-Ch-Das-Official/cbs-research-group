// Content: Get Individual PHD Members Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to send individual phd members data to the client by request of users.

const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");

const getSinglePhdMemberCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const getSinglePhdMemberInfo = await phdMemberModel.findById(id);
    if (!getSinglePhdMemberInfo) {
      res.status(404).json({
        error: "Requested resources are not found!",
        message: "Please check the given details.",
      });
    } else {
      res.status(200).json(getSinglePhdMemberInfo);
    }
  } catch (error) {
    console.log("There is some technical error occared!", error);
    res.status(500).json({
      Error: error,
      Message: `Unable to find phd member info due to:${error.message}`,
    });
  }
};
module.exports = getSinglePhdMemberCtrl;
