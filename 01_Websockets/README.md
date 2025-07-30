# WebSocket Group Chat Application

A real-time chat application built with Node.js, Express, and WebSockets to demonstrate the power of bidirectional communication between clients and servers.

## Learning Objectives

This tutorial project will help you understand:
- How WebSockets enable real-time, bidirectional communication
- The difference between HTTP requests and WebSocket connections
- How to implement a multi-user chat room system
- Managing client connections and broadcasting messages
- Building interactive real-time applications

## Features

### Core Chat Functionality
- **Real-time messaging**: Messages appear instantly for all users in the same room
- **Multiple chat rooms**: Users can join different rooms by visiting different URLs
- **User identification**: Each user has a username that appears with their messages
- **Join/leave notifications**: System announces when users enter or exit the room

### Advanced Features
- **Private messaging**: Send direct messages to specific users with `/pm username message`
- **Username changes**: Change your display name on the fly with `/nick newname`
- **Member list**: View all active users in the room with `/members`
- **Joke integration**: Get random dad jokes with `/joke` command
- **Persistent rooms**: Rooms are created on-demand and exist as long as they have members

## Technology Stack

- **Backend**: Node.js with Express.js
- **WebSocket Library**: express-ws (WebSocket support for Express)
- **External API**: icanhazdadjoke.com for joke functionality
- **Frontend**: Vanilla JavaScript with jQuery
- **Styling**: Basic CSS for a clean chat interface

## Project Structure

```
groupchat/
├── app.js              # Express app setup and WebSocket route handling
├── server.js           # Server initialization
├── ChatUser.js         # User class managing individual connections
├── Room.js             # Room class managing chat rooms and broadcasts
├── jokes.js            # Joke API integration
├── chat.html           # Main chat interface
├── package.json        # Dependencies and scripts
├── static/
│   ├── css/
│   │   └── styles.css  # Chat UI styling
│   └── js/
│       └── chat.js     # Client-side WebSocket handling
└── README.md          # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd groupchat
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   Or with nodemon for auto-reload:
   ```bash
   nodemon server.js
   ```
5. Open your browser and visit:
   ```
   http://localhost:3000/roomname
   ```
   Replace `roomname` with any name you want for your chat room

## How to Use

### Basic Commands
Once you're in a chat room, you can use these commands:

| Command | Description | Example |
|---------|-------------|---------|
| Regular message | Just type and press Enter | `Hello everyone!` |
| `/joke` | Get a random dad joke | `/joke` |
| `/members` | List all users in the room | `/members` |
| `/nick newname` | Change your username | `/nick CoolUser123` |
| `/pm user message` | Send a private message | `/pm Alice Hey there!` |

### Testing with Multiple Users
1. Open multiple browser windows/tabs
2. Visit the same room URL in each window
3. Enter different usernames when prompted
4. Start chatting and see messages appear in real-time!

## How It Works

### WebSocket Connection Flow

1. **Client connects**: When a user visits `/roomname`, they load the chat interface
2. **WebSocket handshake**: JavaScript establishes a WebSocket connection to `ws://localhost:3000/chat/roomname`
3. **User joins**: After entering a username, the client sends a "join" message
4. **Server broadcasts**: The server notifies all users in the room about the new member
5. **Real-time messaging**: Messages are instantly broadcast to all connected clients
6. **Disconnection handling**: When a user closes their browser, others are notified

### Key Components

#### ChatUser Class
- Represents an individual user connection
- Handles incoming messages and routes them to appropriate handlers
- Manages user state (name, room membership)

#### Room Class
- Implements a registry pattern for room management
- Maintains a Set of active members
- Handles broadcasting messages to all room members

#### Message Types
The application uses different message types for different purposes:
- `join`: User joining the room
- `chat`: Regular chat message
- `note`: System notifications (joins/leaves)
- `get-joke`: Request for a joke
- `get-members`: Request for member list
- `change-username`: Username change request
- `priv-chat`: Private message

## Learning Exercises

### For Beginners
1. Add a timestamp to each message
2. Add a "user is typing..." indicator
3. Create a welcome message with room rules

### Intermediate Challenges
1. Add message history (last 10 messages for new joiners)
2. Implement user colors (assign random colors to usernames)
3. Add emoji support
4. Create a `/help` command that lists all available commands

### Advanced Extensions
1. Add room passwords
2. Implement user roles (admin/moderator/user)
3. Add file sharing capabilities
4. Create a React/Vue frontend
5. Add message persistence with a database
6. Implement reconnection logic for dropped connections

## Troubleshooting

### Common Issues

1. **"Cannot connect to WebSocket"**
   - Make sure the server is running
   - Check if you're using the correct port (3000)
   - Ensure no firewall is blocking WebSocket connections

2. **Messages not appearing**
   - Check browser console for errors
   - Verify you've joined the room (entered username)
   - Make sure JavaScript is enabled

3. **Jokes not working**
   - Requires internet connection for the joke API
   - Check if the API endpoint is accessible

## Understanding WebSockets

### HTTP vs WebSocket

**Traditional HTTP:**
- Client requests → Server responds → Connection closes
- One-way communication initiated by client
- Good for static content

**WebSocket:**
- Client and server maintain persistent connection
- Bidirectional communication
- Perfect for real-time applications

### When to Use WebSockets
- Chat applications
- Live notifications
- Collaborative editing
- Real-time gaming
- Live sports updates
- Stock tickers