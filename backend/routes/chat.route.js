import express from 'express';
import { saveUserMessage, saveBotMessage } from '../controllers/chat.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/user-message', verifyToken, saveUserMessage);
router.post('/bot-message', verifyToken, saveBotMessage);

export default router;