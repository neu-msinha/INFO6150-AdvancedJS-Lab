"use strict";

const express = require("express");
const app = express();

// Basic route to test server
app.get("/", function (req, res) {
  res.send("Server is running!");
});

module.exports = app;