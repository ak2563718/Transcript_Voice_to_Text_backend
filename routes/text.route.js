import express from 'express';
import { deleteMany, deletetext, getallTranscript, singletranscript } from '../controller/text.Controller.js';
import { authmiddleware } from '../middleware/auth.Middleware.js';

const router = express.Router();
router.get('/alltranscript',getallTranscript)
router.get('/getone/:id',singletranscript)
router.delete('/delete/:id',deletetext)
router.delete('/deleteall',deleteMany)

export default router