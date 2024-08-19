// Content: Server Route Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024
// Details: This is the entry point of all route, and this the mother/root of all route segments.

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

// Create App //
const app = express();

// Use Middleware Functions //
app.use(json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle base Routes //
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

// Handle Masters Alumni Routes
app.use("/cbs-research-groups/v1/masters", mastersAlumniRouter);

// Handle Doctorate Alumni Routes
app.use("/cbs-research-groups/v1/doctorate", doctorateAlumniRouter);

// Handle PHD Members Routes
app.use("/cbs-research-groups/v1/phd", phdMembersRouter);

// Handle MSC Members Routes
app.use("/cbs-research-groups/v1/msc", mscMembersRouter);

// Handle Group News Routes
app.use("/cbs-research-groups/v1/latest-news", groupNewsRouter);

// Handle Personal Awards Routes
app.use("/cbs-research-groups/v1/personal", personalAwardsRouter);

// Handle Team Awards Routes
app.use("/cbs-research-groups/v1/team", teamAwardsRouter);
module.exports = app;
