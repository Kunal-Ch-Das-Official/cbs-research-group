// Content: Get Individual MSC Members Info From Client Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to send individual msc members data to the client by request of users.

const mscMemberModel = require("../../../models/members-model/msc-member-model/mscMemberModel");

const getSingleMscMemberCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleMscMemberInfo = await mscMemberModel.findById(id);
    if (!getSingleMscMemberInfo) {
      res.status(404).json({
        message: "Msc member are not available!",
      });
    } else {
      res.status(200).json(getSingleMscMemberInfo);
    }
  } catch (error) {
    console.log("There is some technical error occared!", error);
    res.status(500).json({
      Error: error,
      Message: `Unable to find phd member info due to:${error.message}`,
    });
  }
};
module.exports = getSingleMscMemberCtrl;
