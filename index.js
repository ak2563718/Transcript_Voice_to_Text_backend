import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.Middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser());

app.use(errorMiddleware);
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})