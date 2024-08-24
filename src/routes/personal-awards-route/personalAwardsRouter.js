/**
 * Personal Awards Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This router manages all routes related to personal awards for
 * Professor Chinmoy Bhattacharya within the CBS Research Group.
 * It defines endpoints for handling personal awards data, including
 * operations such as creating, reading, updating, and deleting award
 * records.
 *
 * Usage:
 * Use this router to manage routes for interacting with personal awards
 * data. It ensures that requests related to Professor Bhattacharya's
 * awards are properly processed and routed to the appropriate handlers
 * or services.
 */

const express = require("express");
const uploadPersonalAwardsCtrl = require("../../controller/awards-controllers/personal-awards-controller/uploadPersonalAwardCtrl");
const updatePersonalAwardCtrl = require("../../controller/awards-controllers/personal-awards-controller/updatePersonalAwardCtrl");
const deletePersonalAwardsCtrl = require("../../controller/awards-controllers/personal-awards-controller/deletePersonalAwardsCtrl");
const getPersonalAwardsCtrl = require("../../controller/awards-controllers/personal-awards-controller/getPersonalAwardsCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

const personalAwardsRouter = express.Router();

// Post chinmoy bhattacharya' s personal awards info router
personalAwardsRouter.post("/awards", checkAdminAuth, uploadPersonalAwardsCtrl);

// Update chinmoy bhattacharya' s personal awards info router
personalAwardsRouter.patch(
  "/awards/:id",
  checkAdminAuth,
  updatePersonalAwardCtrl
);

// Get all chinmoy bhattacharya' s personal awards info router
personalAwardsRouter.get("/awards", cacheMiddleware, getPersonalAwardsCtrl);

// Get one by one chinmoy bhattacharya' s personal awards info router
personalAwardsRouter.get("/awards/:id", cacheMiddleware, getPersonalAwardsCtrl);

// Delete specific chinmoy bhattacharya' s personal awards info router
personalAwardsRouter.delete(
  "/awards/:id",
  checkAdminAuth,
  deletePersonalAwardsCtrl
);

module.exports = personalAwardsRouter;
