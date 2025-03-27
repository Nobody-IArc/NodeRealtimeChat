// 채팅방 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createChatRoom } = require('../controllers/chatRoomController');

// 경로 지정
router.post('/create', authMiddleware, createChatRoom);

module.exports = router;
