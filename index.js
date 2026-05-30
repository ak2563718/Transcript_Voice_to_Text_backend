import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import { createClient } from "@deepgram/sdk";
import { prisma } from "./src/db.js";
import cloudinary from "./config/cloudinary.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);
   console.log("Current clients:", io.engine.clientsCount);
    let audioChunks = [];
    let finalTranscript = "";
    let dgConnection = null;
    let secure_url = '';
    let filePath = null;
    // Create Deepgram live connection for this user
      dgConnection = deepgram.listen.live({
      model: "nova-3",
      language: "en",
      smart_format: true,
    });

  dgConnection.on("open", () => {
    console.log(`Deepgram connected for ${socket.id}`);
  });

  dgConnection.on("Results", (data) => {
    const transcript =
      data.channel?.alternatives?.[0]?.transcript;
      if (!transcript) return;

      if (data.is_final) {
        finalTranscript += transcript + " ";
      }
      if (transcript && transcript.trim()) {
        socket.emit("transcript", {
          text: transcript,
        });
      }
  });

  dgConnection.on("error", (error) => {
    console.error("Deepgram Error:", error);
  });

  dgConnection.on("close", async() => {
    console.log(`Deepgram closed for ${socket.id}`);
    console.log(finalTranscript)
    if(!finalTranscript) return;
    await prisma.text.create({
      data:{
        text:finalTranscript,
        audioUrl:secure_url,
      }
    })
    fs.unlinkSync(filePath)
  });
    
  socket.on("audio-chunk", (data) => {
    const buffer = Buffer.from(data);
    audioChunks.push(buffer);

    try {
      if (dgConnection.getReadyState?.() === 1) {
        dgConnection.send(buffer);
      }
    } catch (err) {
      console.error(err);
    }
  }); 
    socket.on("recording-ended", async() => {
    try {
      const audioBuffer = Buffer.concat(audioChunks);

    filePath = `recording-${socket.id}.webm`;

    fs.writeFileSync(filePath, audioBuffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      filePath,
      {
        resource_type: "video",
        folder: "recordings",
      }
    );
      secure_url = result.secure_url;
      dgConnection.finish?.();
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    try {
      dgConnection.finish?.();
    } catch (err) {
      console.error(err);
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});