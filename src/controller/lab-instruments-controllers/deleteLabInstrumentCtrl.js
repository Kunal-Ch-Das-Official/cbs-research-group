// Content: Delete Specific Lab Instrument Info By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to delete single lab instrument data from database by client request .

const labInstrumentModel = require("../../models/lab-instruments-model/labInstrumentModel");
const customSingleDestroyer = require("../../utils/cloudinary-single-destroyer/customSingleDestroyer");

const deleteLabInstrumentCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const getRequestedLabInstrumentInfo = await labInstrumentModel.findById(id);
    const instrumentImagePublicId =
      getRequestedLabInstrumentInfo.instrumentImagePublicId;
    if (!getRequestedLabInstrumentInfo) {
      return res.status(404).json({
        error: "Requested resources are not found!",
        message: "Please check the given details.",
      });
    } else {
      instrumentImagePublicId &&
        (await customSingleDestroyer(instrumentImagePublicId));
      const deleteRequestedInstrumentInfo =
        await labInstrumentModel.findByIdAndDelete(id);
      if (!deleteRequestedInstrumentInfo) {
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
module.exports = deleteLabInstrumentCtrl;
