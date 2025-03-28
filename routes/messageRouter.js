// 메시지 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getMessageByRoom,
    deleteMessage,
} = require('../controllers/messageController');

// chatRoomId 를 가져오기 때문에 /:id 가 먼저 나옴
router.get('/:id/messages', authMiddleware, getMessageByRoom);
// 삭제 기능에서는 messageId 값만 가져와도 충분하기 때문에 이렇게 사용
router.delete('/messages/:id', authMiddleware, deleteMessage);

module.exports = router;
