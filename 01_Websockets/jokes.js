"use strict";

const axios = require("axios");
const JOKES_API = "https://icanhazdadjoke.com/";

async function getRandomJoke() {
  let result;

  try {
    result = await axios.get(
      JOKES_API,
      {
        headers:
        {
          'Accept': 'application/json',
          'User-Agent': 'websocket groupchat exercise',
        }
      }
    );

  } catch (err) {
    return "No jokes right now, try again later!"
  }

  return result.data.joke;
}

module.exports = {
  getRandomJoke,
}