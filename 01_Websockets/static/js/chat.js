// CLIENT SIDE JS CODE!!!

// Open websocket connection from the browser to the server
const urlParts = document.URL.split("/");
const roomName = urlParts.at(-1);
const socket = new WebSocket(`ws://localhost:3000/chat/${roomName}`);
const username = prompt("Enter your username.  (no spaces)");

socket.onopen = (evt) => {
  console.log("WEB SOCKET OPENED!!!");
  const data = { type: "join", name: username };
  socket.send(JSON.stringify(data));
  
  // Display available commands
  const helpItem = document.createElement("li");
  helpItem.innerHTML = `<i>Commands: /joke (get a joke), /members (list users), /nick newname (change name), /pm user msg (private message)</i>`;
  helpItem.style.color = "gray";
  document.querySelector("#messages").appendChild(helpItem);
};

socket.onmessage = (evt) => {
  console.log("NEW MESSAGE", evt);
  let msg = JSON.parse(evt.data);
  if (msg.type === "note") {
    const item = document.createElement("li");
    const text = document.createElement("i");
    text.textContent = msg.text;
    item.appendChild(text);
    document.querySelector("#messages").appendChild(item);
  } else if (msg.type === "chat") {
    const item = document.createElement("li");
    item.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
    document.querySelector("#messages").appendChild(item);
  } else if (msg.type === "priv-chat") {
    const item = document.createElement("li");
    item.innerHTML = `<b>${msg.name} (private):</b> ${msg.text}`;
    item.style.color = "blue";
    document.querySelector("#messages").appendChild(item);
  }
};

socket.onerror = (evt) => {
  console.log("SOMETHING WENT WRONG!");
  console.log(evt);
};

socket.onclose = (evt) => {
  console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
};

document.querySelector("#msg-form").addEventListener("submit", (evt) => {
  const input = document.querySelector("#messageInput");
  evt.preventDefault();
  
  // Check for special commands
  if (input.value === "/joke") {
    socket.send(JSON.stringify({ type: "get-joke" }));
  } else if (input.value === "/members") {
    socket.send(JSON.stringify({ type: "get-members" }));
  } else if (input.value.startsWith("/nick ")) {
    const newUsername = input.value.substring(6);
    socket.send(JSON.stringify({ type: "change-username", text: newUsername }));
  } else if (input.value.startsWith("/pm ")) {
    // Format: /pm username message
    const parts = input.value.substring(4).split(" ");
    const recipient = parts[0];
    const message = parts.slice(1).join(" ");
    socket.send(JSON.stringify({ 
      type: "priv-chat", 
      recipient: recipient, 
      text: message 
    }));
  } else {
    // Regular chat message
    const payload = JSON.stringify({ type: "chat", text: input.value });
    socket.send(payload);
  }
  
  input.value = "";
});

// Add joke button handler
document.querySelector("#joke-btn").addEventListener("click", (evt) => {
  socket.send(JSON.stringify({ type: "get-joke" }));
});