// 채팅방 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createChatRoom,
    getAllChatRooms,
    getChatRoomById,
    updateChatRoom,
    deleteChatRoom,
    joinChatRoom,
    leaveChatRoom,
    getParticipants,
    kickUserFromChatRoom,
} = require('../controllers/chatRoomController');

// 경로 지정
router.post('/create', authMiddleware, createChatRoom);
router.get('/', authMiddleware, getAllChatRooms);
router.get('/:id', authMiddleware, getChatRoomById);
router.put(':/id', authMiddleware, updateChatRoom);
router.delete('/:id', authMiddleware, deleteChatRoom);
router.post('/:id/join', authMiddleware, joinChatRoom);
router.post('/:id/leave', authMiddleware, leaveChatRoom);
router.get('/:id/users', authMiddleware, getParticipants);
router.post('/:id/kick', authMiddleware, kickUserFromChatRoom);

module.exports = router;
