// 메시지 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMessageByRoom } = require('../controllers/messageController');

router.get('/:id/messages', authMiddleware, getMessageByRoom);

module.exports = router;
