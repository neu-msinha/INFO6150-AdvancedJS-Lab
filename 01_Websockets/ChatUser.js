"use strict";

class ChatUser {
  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.roomName = roomName; // room name
    this.name = null; // becomes the username of the visitor

    console.log(`created chat in room ${this.roomName}`);
  }

  /** Send msgs to this client using underlying connection-send-function. */
  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** Handle messages from client */
  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);
    console.log("Received message:", msg);
    
    // For now, just echo back
    this.send(JSON.stringify({
      type: "echo",
      text: `You said: ${jsonData}`
    }));
  }

  /** Connection was closed */
  handleClose() {
    console.log(`User disconnected from ${this.roomName}`);
  }
}

module.exports = ChatUser;