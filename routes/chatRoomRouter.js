// 채팅방 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createChatRoom,
    getAllChatRooms,
    getChatRoomById,
    joinChatRoom,
    leaveChatRoom,
} = require('../controllers/chatRoomController');

// 경로 지정
router.post('/create', authMiddleware, createChatRoom);
router.get('/', authMiddleware, getAllChatRooms);
router.get('/:id', authMiddleware, getChatRoomById);
router.post('/:id/join', authMiddleware, joinChatRoom);
router.post('/:id/leave', authMiddleware, leaveChatRoom);

module.exports = router;
