"use strict";

const express = require("express");
const app = express();
const ChatUser = require("./ChatUser");

// Enable WebSocket support
const wsExpress = require("express-ws")(app);

// Serve static files
app.use(express.static("static/"));

// Serve chat HTML for any room
app.get("/:roomName", function (req, res, next) {
  res.sendFile(`${__dirname}/chat.html`);
});

// WebSocket route
app.ws("/chat/:roomName", function (ws, req, next) {
  try {
    const user = new ChatUser(
      ws.send.bind(ws), // fn to call to message this user
      req.params.roomName // name of room for user
    );

    // register handlers for message-received, connection-closed
    ws.on("message", function (data) {
      try {
        user.handleMessage(data);
      } catch (err) {
        console.error(err);
      }
    });

    ws.on("close", function () {
      try {
        user.handleClose();
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = app;