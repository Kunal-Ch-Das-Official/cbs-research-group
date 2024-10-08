/**
 * Dashboard Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 30/09/2024
 *
 * Description:
 * This router handles aggregated GET requests for various data within the
 * CBS Research Group. It defines the endpoints for managing dashboard
 * data, excluding CRUD operations such as creating, reading, updating, or
 * deleting records. It is primarily used to aggregate different datasets
 * and send all the data in response to the relevant requests.
 *
 * Usage:
 * Use this router to manage routes for retrieving aggregated data, including
 * but not limited to doctorate alumni data. It ensures that requests related
 * to data aggregation are properly processed and routed to the appropriate
 * handlers or services.
 */

const express = require('express');
const getAllData = require('../../controller/dashboard-controllers/getAllData');
const checkAdminAuth = require('../../middlewares/auth-middleware/authAdminMiddleware');

const dashBoardRouter = express.Router();

dashBoardRouter.get('/dashboard', checkAdminAuth, getAllData);

module.exports = dashBoardRouter;
