// Content: Group News Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 18/08/2024
// Details: This is the router file for handle all routes of latest group news of cbs research groups.

const express = require("express");
const uploadGroupNewsCtrl = require("../../controller/group-news-controller/uploadGroupNewsCtrl");
const updateGroupNewsCtrl = require("../../controller/group-news-controller/updateGroupNewsCtrl");
const deleteGroupNewsCtrl = require("../../controller/group-news-controller/deleteGroupNewsCtrl");
const getGroupNewsCtrl = require("../../controller/group-news-controller/getGroupNewsCtrl");

const groupNewsRouter = express.Router();

// Declaration Of Post Group News Data Route Segment:
groupNewsRouter.post("/groups", uploadGroupNewsCtrl);

// Declaration Of Update Existing Group News Data Route Segment:
groupNewsRouter.patch("/groups/:id", updateGroupNewsCtrl);

// Declaration Of Get All Group News Data Route Segment:
groupNewsRouter.get("/groups", getGroupNewsCtrl);

// Declaration Of Get Single Group News Data Route Segment:
groupNewsRouter.get("/groups/:id", getGroupNewsCtrl);

// Declaration Of Delete Existing Group News Data Route Segment:
groupNewsRouter.delete("/groups/:id", deleteGroupNewsCtrl);

module.exports = groupNewsRouter;
