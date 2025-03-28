// 메시지 관련 컨트롤러

const Message = require('../models/message');
const mongoose = require('mongoose');

const getMessageByRoom = async (req, res) => {
    const roomId = req.params.id;
    const { lastMessageId } = req.query;
    const limit = parseInt(process.env.MESSAGES_LIMIT) || 30;

    try {
        const query = { room: roomId };

        // ObjectId 형태로 파싱 - 최근 순 정렬 및 최근 n 개의 메시지 DB 에서 가져오기 위함
        if (lastMessageId) {
            query._id = { $lt: new mongoose.Types.ObjectId(lastMessageId) };
        }

        const messages = await Message.find(query)
            .sort({ _id: -1 })
            .limit(limit)
            .populate('sender', 'username')
            .exec(); // 보안을 위해 populate 로 일부 값만 추출

        res.status(200).json({
            message: '조회 성공',
            data: messages.reverse(), // 오래된 메시지가 위에 있어야 함
        });
    } catch (err) {
        res.status(500).json({
            message: '메시지 조회 실패',
            error: err.message,
        });
    }
};

module.exports = { getMessageByRoom };
