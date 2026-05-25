import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { errorMiddleware } from './middleware/error.Middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());


// ======================
// HTTP SERVER
// ======================

const server = createServer(app);


// ======================
// SOCKET.IO SETUP
// ======================

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
});

// ======================
// SOCKET CONNECTION
// ======================

io.on("connection", (socket) => {

    console.log(`User Connected: ${socket.id}`);
    // receive audio chunk
    socket.on("audio-chunk", async (data) => {

        console.log("Audio chunk received");


        // later:
        // send data to whisper/deepgram


        // temporary transcript response
        socket.emit("transcript", {
            text: "Live transcript coming..."
        });
    });


    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});


// ======================
// ERROR MIDDLEWARE
// ======================

app.use(errorMiddleware);


// ======================
// SERVER LISTEN
// ======================

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});