/**
 * Dashboard Controller
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 30/09/2024
 *
 * Description:
 * This controller handles requests to retrieve aggregated data for the dashboard,
 * including group news, and sends the relevant data to the client.
 *
 * Functionality:
 * - Receives requests to fetch various types of dashboard-related information,
 *   including group news.
 * - Retrieves the necessary group news data along with any other required
 *   dashboard data from the database.
 * - Sends the retrieved data to the client for rendering on the dashboard.
 * - Handles any errors that may occur during data aggregation or retrieval.
 *
 * Usage:
 * Use this controller to provide clients with comprehensive dashboard information,
 * including up-to-date group news and other data, in response to relevant requests.
 * It ensures users can view aggregated content on the CBS Research Group dashboard.
 */

const adminRegistrationRequestMessageModel = require('../../models/admin-registration-request-model/adminRegisterRequestModel');
const doctorateAlumniModel = require('../../models/alumni-model/doctorate-alumni-model/doctorateAlumniModel');
const mastersAlumniModel = require('../../models/alumni-model/masters-alumni-model/mastersAlumniModel');
const authAdminUserModel = require('../../models/auth-admin-model/authAdminUserModel');
const personalAwardsModel = require('../../models/awards-model/personal-awards-model/personalAwardsModel');
const teamAwardsModel = require('../../models/awards-model/team-awards-model/teamAwardsModel');
const contactFormModel = require('../../models/contact-form-model/contactFormModel');
const groupNewsModel = require('../../models/group-news-model/groupNewsModel');
const labInstrumentModel = require('../../models/lab-instruments-model/labInstrumentModel');
const mscMemberModel = require('../../models/members-model/msc-member-model/mscMemberModel');
const phdMemberModel = require('../../models/members-model/phd-member-model/phdMemberModel');
const projectModel = require('../../models/projects-model/projectModel');
const publicationModel = require('../../models/publication-model/publicationModel');

const getAllData = async (req, res) => {
  const aggregatedData = [];
  try {
    // 1. ALL LOGGED IN ADMIN REQUEST
    const getAllAuthAdmin = await authAdminUserModel.find();
    if (getAllAuthAdmin) {
      const authAdmin = {
        auth_admin: getAllAuthAdmin,
      };
      aggregatedData.push(authAdmin);
    }

    // 2. ALL BECOME ADMIN REGISTRATION REQUEST
    const getAllAdminReG_ReqInfo =
      await adminRegistrationRequestMessageModel.find();
    if (getAllAdminReG_ReqInfo) {
      const beAdminReq = {
        be_admin_req: getAllAdminReG_ReqInfo,
      };
      aggregatedData.push(beAdminReq);
    }

    // 3. ALL DOCTORATE ALUMNI REQUEST
    const getAllDoctorateAlumniInfo = await doctorateAlumniModel.find();
    if (getAllDoctorateAlumniInfo) {
      const doctorateAlumni = {
        doc_alumni: getAllDoctorateAlumniInfo,
      };
      aggregatedData.push(doctorateAlumni);
    }

    // 4. ALL MASTERS ALUMNI REQUEST
    const getAllMastersAlumniInfo = await mastersAlumniModel.find();
    const mastersAlumni = {
      mas_alumni: getAllMastersAlumniInfo,
    };
    if (getAllMastersAlumniInfo) {
      aggregatedData.push(mastersAlumni);
    }

    // 5. ALL PERSONAL AWARDS REQUEST
    const getAllPersonalAwards = await personalAwardsModel.find();
    if (getAllPersonalAwards) {
      const personalAwards = {
        personal_awards: getAllPersonalAwards,
      };
      aggregatedData.push(personalAwards);
    }

    // 6. ALL TEAM AWARDS REQUEST
    const getAllTeamAwards = await teamAwardsModel.find();
    if (getAllTeamAwards) {
      const teamAwards = {
        team_awards: getAllTeamAwards,
      };
      aggregatedData.push(teamAwards);
    }

    // 7. ALL CONTACT APPLICATION REQUEST
    const getAllRequestedContactInfo = await contactFormModel.find();
    if (getAllRequestedContactInfo) {
      const contactApplication = {
        contact_application: getAllRequestedContactInfo,
      };
      aggregatedData.push(contactApplication);
    }
    // 8. ALL GROUP NEWs REQUEST
    const getAllGroupNews = await groupNewsModel.find();
    if (getAllGroupNews) {
      const groupNews = {
        group_news: getAllGroupNews,
      };
      aggregatedData.push(groupNews);
    }
    // 9. ALL LAB INSTRUMENTS REQUEST
    const getAllInstrumentsInfo = await labInstrumentModel.find();
    if (getAllInstrumentsInfo) {
      const labInstruments = {
        lab_instruments: getAllInstrumentsInfo,
      };
      aggregatedData.push(labInstruments);
    }

    // 10. ALL MSC MEMBERS REQUEST
    const getAllMscMembersInfo = await mscMemberModel.find();
    if (getAllMscMembersInfo) {
      const mscMembers = {
        msc_members: getAllMscMembersInfo,
      };
      aggregatedData.push(mscMembers);
    }
    // 11. ALL PHD MEMBERS REQUEST
    const getAllPhdMembersInfo = await phdMemberModel.find();
    if (getAllPhdMembersInfo) {
      const phdMembers = {
        phd_members: getAllPhdMembersInfo,
      };
      aggregatedData.push(phdMembers);
    }
    // 12. ALL PROJECTS REQUEST
    const getAllProjects = await projectModel.find();
    if (getAllProjects) {
      const projects = {
        projects: getAllProjects,
      };
      aggregatedData.push(projects);
    }
    // 13. ALL PUBLICATIONS REQUEST
    const getAllPublication = await publicationModel.find();
    if (getAllPublication) {
      const publications = {
        publication: getAllPublication,
      };
      aggregatedData.push(publications);
    }

    return res.status(200).json(aggregatedData);
  } catch (error) {
    return res.status(500).json({
      issue: error.message,
      details: 'Something went wrong.',
    });
  }
};
module.exports = getAllData;
