// Content: Personal Awards Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: This is the router file for handle all routes of all personal awards of prof. chinmoy bhattacharya.

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

// Declaration Of Upload Route Segment:
personalAwardsRouter.post("/awards", checkAdminAuth, uploadPersonalAwardsCtrl);

// Declaration Of Update Route Segment:
personalAwardsRouter.patch(
  "/awards/:id",
  checkAdminAuth,
  updatePersonalAwardCtrl
);

// Declaration Of Get All Route Segment:
personalAwardsRouter.get("/awards", cacheMiddleware, getPersonalAwardsCtrl);

// Declaration Of Get Single Route Segment:
personalAwardsRouter.get("/awards/:id", cacheMiddleware, getPersonalAwardsCtrl);

// Declaration Of Delete Route Segment:
personalAwardsRouter.delete(
  "/awards/:id",
  checkAdminAuth,
  deletePersonalAwardsCtrl
);

module.exports = personalAwardsRouter;
