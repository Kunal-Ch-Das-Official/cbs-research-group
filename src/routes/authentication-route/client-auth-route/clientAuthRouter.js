// Content: Client Authentication Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 21/08/2024
// Details: This is the router file for handle the client authentications

const express = require("express");

const clientAuthenticationRouter = express.Router();

clientAuthenticationRouter.post("/register");

module.exports = clientAuthenticationRouter;
