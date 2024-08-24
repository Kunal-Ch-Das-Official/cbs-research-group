/**
 * Server Route Handler (app.js)
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 15/08/2024
 *
 * Description:
 * This file serves as the entry point for all routes in the application.
 * It acts as the main router or root router, coordinating and directing
 * requests to the appropriate route segments or handlers.
 *
 * Usage:
 * This file should be used to define and configure the primary routes
 * for the application. It ensures that incoming requests are properly
 * routed to the corresponding route handlers or modules.
 */

const express = require("express");
const { json } = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mastersAlumniRouter = require("./routes/masters-alumni-route/mastersAlumniRouter");
const doctorateAlumniRouter = require("./routes/doctorate-alumni-route/doctorateAlumniRouter");
const phdMembersRouter = require("./routes/phd-members-route/phdMemberRouter");
const mscMembersRouter = require("./routes/msc-members-route/mscMembersRouter");
const groupNewsRouter = require("./routes/group-news-route/groupNewsRouter");
const personalAwardsRouter = require("./routes/personal-awards-route/personalAwardsRouter");
const teamAwardsRouter = require("./routes/team-awards-route/teamAwardsRouters");
const labInstrumentsRouter = require("./routes/lab-instruments-route/labInstrumentsRouter");
const contactFormRouter = require("./routes/contact-us-route/contactUsRouter");
const projectsRouter = require("./routes/projects-route/projectsRouter");
const admiAuthenticationRouter = require("./routes/admin-auth-route/admiAuthenticationRouter");
const adminRegistrationReqRouter = require("./routes/admin-registration-request-route/asAdminRegisterReqRouter");
const publicationRouter = require("./routes/publication-route/publicationRouter");

// Create App //
const app = express();

// Use Middleware Functions //
app.use(json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle base routes //
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to (CBS-Research-Group) Server",
    owner: "Dr.Chinmoy Bhattacharya",
    details:
      "This is the server of cbs-research-group(chemistry-research-lab). It is located in Howrah, Shibpur, Kolkata(West-Bengal, India)",
    admin: "admindashboard.chinmoybhattacharyaelectrochemistry.com",
    main: "chinmoybhattacharyaelectrochemistry.com",
    route: "Home",
  });
});

// Register Admin Authentication Endpoint
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-admin",
  admiAuthenticationRouter
);

// Register be admin request Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/register-request",
  adminRegistrationReqRouter
);

// Register Contact Form Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/contact-us",
  contactFormRouter
);

// Register Doctorate Alumni Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/doctorate",
  doctorateAlumniRouter
);

// Register Group News Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/latest-news",
  groupNewsRouter
);

// Register Lab Instruments Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/facilities",
  labInstrumentsRouter
);

// Register Masters Alumni Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/masters",
  mastersAlumniRouter
);

// Register MSC Members Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/msc",
  mscMembersRouter
);

Endpoints;
// Register PHD Members Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/phd",
  phdMembersRouter
);

// Register Personal Awards Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal",
  personalAwardsRouter
);

// Register Projects Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-labs",
  projectsRouter
);
// Register Team Awards Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/team",
  teamAwardsRouter
);

// Register Publication Endpoints
app.use(
  "/iiest-shibpur/chemistry-department/cbs-research-groups/v1/publication",
  publicationRouter
);

module.exports = app;
