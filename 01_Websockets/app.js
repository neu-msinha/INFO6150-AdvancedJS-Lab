"use strict";

const express = require("express");
const app = express();

// Enable WebSocket support
const wsExpress = require("express-ws")(app);

// Basic HTTP route
app.get("/", function (req, res) {
  res.send("Server is running!");
});

// WebSocket route
app.ws("/chat/:roomName", function (ws, req, next) {
  console.log(`New WebSocket connection to room: ${req.params.roomName}`);
  
  ws.on("message", function (data) {
    console.log("Received:", data);
    ws.send("Echo: " + data);
  });

  ws.on("close", function () {
    console.log("WebSocket connection closed");
  });
});

module.exports = app;