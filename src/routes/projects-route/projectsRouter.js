// Content: Projects Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: This is the router file for handle all type of route of projects.

const express = require("express");
const uploadProjectCtrl = require("../../controller/project-controllers/uploadProjectCtrl");
const updateProjectCtrl = require("../../controller/project-controllers/updateProjectCtrl");
const deleteProjectCtrl = require("../../controller/project-controllers/deleteProjectCtrl");
const getProjectsCtrl = require("../../controller/project-controllers/getProjectsCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");

const projectsRouter = express.Router();

// Declaration Of Upload Route Segment:
projectsRouter.post("/projects", checkAdminAuth, uploadProjectCtrl);

// Declaration Of Update Route Segment:
projectsRouter.patch("/projects/:id", checkAdminAuth, updateProjectCtrl);

// Declaration Of Get All Route Segment:
projectsRouter.get("/projects", getProjectsCtrl);

// Declaration Of Get Single Route Segment:
projectsRouter.get("/projects/:id", getProjectsCtrl);

// Declaration Of Delete Route Segment:
projectsRouter.delete("/projects/:id", checkAdminAuth, deleteProjectCtrl);

module.exports = projectsRouter;
