"use strict";

// in-memory storage of roomNames -> room
const rooms = new Map();

class Room {
  /** Get room by that name, creating if nonexistent */
  static get(roomName) {
    if (!rooms.has(roomName)) {
      rooms.set(roomName, new Room(roomName));
    }
    return rooms.get(roomName);
  }

  /** Make a new room, starting with empty set of listeners */
  constructor(roomName) {
    this.name = roomName;
    this.members = new Set();
  }

  /** Handle member joining a room */
  join(member) {
    this.members.add(member);
  }

  /** Handle member leaving a room */
  leave(member) {
    this.members.delete(member);
  }

  /** Send message to all members in a room */
  broadcast(data) {
    for (let member of this.members) {
      member.send(JSON.stringify(data));
    }
  }

  /** Return a Set containing all room members */
  getMembers() {
    return this.members;
  }

  /** Get a room member by name */
  getMember(name) {
    for (let member of this.members) {
      if (member.name === name) return member;
    }
  }
}

module.exports = Room;