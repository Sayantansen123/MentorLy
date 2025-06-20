import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);

// WebSocket handling
io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join-room', roomID => {
    socket.join(roomID);
    socket.to(roomID).emit('user-joined', socket.id);

    socket.on('offer', payload => {
      socket.to(payload.target).emit('offer', payload);
    });

    socket.on('answer', payload => {
      socket.to(payload.target).emit('answer', payload);
    });

    socket.on('ice-candidate', incoming => {
      socket.to(incoming.target).emit('ice-candidate', incoming.candidate);
    });

    socket.on('disconnect', () => {
      socket.to(roomID).emit('user-disconnected', socket.id);
    });
  });
});

// ✅ Only one listen() — for both HTTP and WebSocket
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
