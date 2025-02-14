import dotenv from 'dotenv';
import express from 'express';
import documentRoutes from './routes/documentRoutes.js';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js';
import { getUsername, saveDocument } from './utils/utils.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.use('/api/documents', documentRoutes);
app.use('/api/auth', authRoutes);
io.on('connection', (socket) => {
    socket.on('join-room', async ({ roomId, token }) => {
        socket.join(roomId);
        if (token) {
            console.log(token, roomId)
            const username = await getUsername(token);
            console.log(username)
        }
        console.log(`User ${socket.id} joined room ${roomId}`);

    })
    socket.on("send-changes", async(roomId, delta, content) => {
        await saveDocument(roomId,content);
        socket.broadcast.to(roomId).emit("receive-changes", delta);
    });

    socket.on('send-cursor', async({ roomId, range, token }) => {
        const username = await getUsername(token)
        socket.broadcast.to(roomId).emit("receive-cursor", {username,range});
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
