# DocumentEditingTool
DocumentEditingTool is my personal project - a web-based collaborative text editor with real-time editing, cursor synchronization. Users can create or join rooms, edit text  simultaneously, and track changes in real time.

## What It Does

- Users can create profiles and log in securely
- Real-time collaborative editing
- Cursor synchronization between users
- Join/create rooms with unique IDs
- Mobile-friendly and responsive design

---

## Technologies

- Frontend: React, HTML, CSS
- Backend: Node.js + Express + Mongoose ODM
- Database: MongoDB
- WebSockets: Socket.IO
- Editor: Quill
- Authentication: JWT-based login system
  
---

## 🧪 How It Works

1. User creates or joins a room via a unique URL (`/room/:id`)
2. React connects to the backend using **Socket.IO**
3. All edits and cursor positions are **broadcast in real-time**
4. All connected users in the room see the same document simultaneously
   
---

## How to Run It Locally

1. Clone this repo:

   ```bash
   git clone https://github.com/Bharti-Attri/document-editing-tool.git
   cd document-editing-tool
   ```
2. Install dependencies:
   ```bash
   cd ./backend && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables in .env file.
   ```bash
   PORT=3000
   Mongo_URI=your_database_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the app:
   ```bash
   # In one terminal
   cd backend
   npm start

   # In another terminal
   cd frontend
   npm dev
   ```
## What I Learned

- Managing user authentication securely
- Explore real-time web communication with WebSockets
- Learn how collaborative editing works
- Practice building a full-stack app using React and Node.js
- Experiment with editors like Quill and tools like Socket.IO
- Building interactive UI components with React
- Implementing responsive design for mobile users

## Next Steps
- Chat feature inside rooms
- CRDT/OT-based conflict resolution (e.g. Yjs or Automerge)
- Document version history
- Optimize performance and scalability

---

## Feedback & Contributions

This is a personal project, but I welcome any feedback or suggestions! Feel free to open issues or reach out.












