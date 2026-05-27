import express from 'express';
import { initializeSocket } from '../controller/text.Controller';

const router = express.Router();
router.post('/',initializeSocket)

export default router