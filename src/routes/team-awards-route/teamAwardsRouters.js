/**
 * Team Awards Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This router manages all routes related to team awards for the
 * CBS Research Group. It defines endpoints for handling team awards
 * data, including operations such as creating, reading, updating, and
 * deleting award records.
 *
 * Usage:
 * Use this router to manage routes for interacting with team awards data.
 * It ensures that requests related to team awards are properly processed
 * and routed to the appropriate handlers or services.
 */

const express = require("express");
const uploadTeamAwardCtrl = require("../../controller/awards-controllers/team-awards-controller/uploadTeamAwardCtrl");
const updateTeamAwardCtrl = require("../../controller/awards-controllers/team-awards-controller/updateTeamAwardCtrl");
const deleteTeamAwardCtrl = require("../../controller/awards-controllers/team-awards-controller/deleteTeamAwardCtrl");
const getTeamAwardsCtrl = require("../../controller/awards-controllers/team-awards-controller/getTeamAwardsCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

const teamAwardsRouter = express.Router();

// Post team award information router
teamAwardsRouter.post("/awards", checkAdminAuth, uploadTeamAwardCtrl);

// Update team award information router
teamAwardsRouter.patch("/awards/:id", checkAdminAuth, updateTeamAwardCtrl);

// Get all team award information router
teamAwardsRouter.get("/awards", cacheMiddleware, getTeamAwardsCtrl);

// Get single team award information router
teamAwardsRouter.get("/awards/:id", cacheMiddleware, getTeamAwardsCtrl);

// Delete specific team award information router
teamAwardsRouter.delete("/awards/:id", checkAdminAuth, deleteTeamAwardCtrl);

module.exports = teamAwardsRouter;
