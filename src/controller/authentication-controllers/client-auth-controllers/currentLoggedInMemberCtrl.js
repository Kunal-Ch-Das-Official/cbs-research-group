// Content: Get Current Loggedin Member Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: Role of this controller is for handle get request of current logged in member of cbs research groups.

class getCurrentLoggedinMemberCtrl {
  static currentLoggedinMember = async (req, res) => {
    return res.status(200).json({
      logged_in_member: req.userName,
    });
  };
}
module.exports = getCurrentLoggedinMemberCtrl;
