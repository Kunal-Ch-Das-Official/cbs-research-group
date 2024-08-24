/**
 * Group News Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This router manages all routes related to the latest group news for
 * the CBS Research Group. It defines endpoints for handling news updates,
 * including creating, reading, updating, and deleting news articles.
 *
 * Usage:
 * Use this router to manage routes for interacting with group news data.
 * It ensures that requests related to news updates are properly processed
 * and routed to the appropriate handlers or services.
 */

const express = require("express");
const uploadGroupNewsCtrl = require("../../controller/group-news-controller/uploadGroupNewsCtrl");
const updateGroupNewsCtrl = require("../../controller/group-news-controller/updateGroupNewsCtrl");
const deleteGroupNewsCtrl = require("../../controller/group-news-controller/deleteGroupNewsCtrl");
const getGroupNewsCtrl = require("../../controller/group-news-controller/getGroupNewsCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

const groupNewsRouter = express.Router();

// Declaration Of Post Group News Data Route Segment:
groupNewsRouter.post("/groups", checkAdminAuth, uploadGroupNewsCtrl);

// Declaration Of Update Existing Group News Data Route Segment:
groupNewsRouter.patch("/groups/:id", checkAdminAuth, updateGroupNewsCtrl);

// Declaration Of Get All Group News Data Route Segment:
groupNewsRouter.get("/groups", cacheMiddleware, getGroupNewsCtrl);

// Declaration Of Get Single Group News Data Route Segment:
groupNewsRouter.get("/groups/:id", cacheMiddleware, getGroupNewsCtrl);

// Declaration Of Delete Existing Group News Data Route Segment:
groupNewsRouter.delete("/groups/:id", checkAdminAuth, deleteGroupNewsCtrl);

module.exports = groupNewsRouter;
