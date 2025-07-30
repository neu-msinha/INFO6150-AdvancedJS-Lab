// CLIENT SIDE JS CODE!!!

// Get room name from URL
const urlParts = document.URL.split("/");
const roomName = urlParts.at(-1);

// Create WebSocket connection
const socket = new WebSocket(`ws://localhost:3000/chat/${roomName}`);

socket.onopen = (evt) => {
  console.log("WEB SOCKET OPENED!!!");
};

socket.onmessage = (evt) => {
  console.log("NEW MESSAGE", evt);
  // For now, just log messages
};

socket.onerror = (evt) => {
  console.log("SOMETHING WENT WRONG!");
  console.log(evt);
};

socket.onclose = (evt) => {
  console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
};

// Handle form submission
document.querySelector("#msg-form").addEventListener("submit", (evt) => {
  const input = document.querySelector("#messageInput");
  evt.preventDefault();
  socket.send(input.value);
  input.value = "";
});