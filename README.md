# 🎙️ Voice-to-Text Transcript App - Backend

Backend service for a real-time speech-to-text transcription application.

## Features

* Google OAuth Authentication
* JWT Authentication
* Real-time audio streaming using websocket
* Deepgram Speech-to-Text Integration
* Transcript Storage
* Cloudinary Audio Upload
* MongoDB Database Integration

## Tech Stack

* Node.js
* Express.js
* Javascript
* Passport.js
* Prisma ORM
* MongoDB
* Socket.IO
* Deepgram API
* Cloudinary

## Installation

```bash
git clone <backend-repository-url>
cd backend
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=4000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

DEEPGRAM_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Database Setup

```bash
npx prisma generate
npx prisma migrate dev
```

## Run Development Server

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:4000
```

## API Routes

### Authentication

```txt
GET  /auth/google
GET  /auth/google/callback
POST /auth/login
POST /auth/register
POST /auth/logout
```

### Transcripts

```txt
GET    /transcripts
POST   /transcripts
DELETE /transcripts/:id
```

## Folder Structure

```txt
src/
├── controllers/
├── routes/
├── middleware/
├── config/
├── prisma/
└── utils/
```

## Author

Akash Kumar
