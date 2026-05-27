import { asyncHandler } from "../utils/asyncHandler.js";
import { Server } from "socket.io";

export const initializeSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {

        console.log("User connected");

        socket.on("audio-chunk", async (chunk) => {

            // chunk = small audio buffer

            // send to transcription API here

            const transcript = "hello world";

            socket.emit("transcript", transcript);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};