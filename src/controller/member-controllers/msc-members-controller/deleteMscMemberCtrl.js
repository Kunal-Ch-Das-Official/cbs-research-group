// Content: Delete Specific MSC Members Info By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to delete single msc members data from database by client request .

const mscMemberModel = require("../../../models/members-model/msc-member-model/mscMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");

const deleteMscMemberCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getRequestedMembersInfo = await mscMemberModel.findById(id);
    const { profilePicturePublicId } = getRequestedMembersInfo;
    if (!profilePicturePublicId) {
      return res.status(404).json({
        message: "Msc members images are not available!",
      });
    } else {
      profilePicturePublicId &&
        (await customSingleDestroyer(profilePicturePublicId));
      const deleteRequestedMembersInfo = await mscMemberModel.findByIdAndDelete(
        id
      );
      if (!deleteRequestedMembersInfo) {
        return res.status(406).json({
          message: "Your applications are not acceptable, try again later!",
        });
      } else {
        return res.status(200).json({
          message: "Requested resources has been successfully deleted!",
        });
      }
    }
  } catch (error) {
    console.log("There is some technical error occared!", error);
    return res.status(500).json({
      Error: error,
      Message: `Unable to remove phd members info due to:${error.message}`,
    });
  }
};
module.exports = deleteMscMemberCtrl;
