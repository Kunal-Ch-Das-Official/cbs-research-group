// Content: Server Route Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 15/08/2024

const express = require("express");
const { json } = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create App //
const app = express();

// Use Middleware Functions //
app.use(json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle Routes //
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CBS Research Group Server",
    owner: "Dr.Chinmoy Bhattacharya",
    details:
      "This is the server of cbs-research-group(chemistry-research-lab). It is located in Howrah, Shibpur, Kolkata(West-Bengal, India)",
    admin: "admin.chinmoybhattacharyaelectrochemistry.com",
    main: "chinmoybhattacharyaelectrochemistry.com",
    route: "Home",
    status: 200,
  });
});
module.exports = app;
