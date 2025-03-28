// 메시지 관련 컨트롤러

const Message = require('../models/message');
const mongoose = require('mongoose');

// 채팅방 입장 시 이전 n 개의 메시지를 띄워주는 기능
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

// 사용자 인증 후 본인이 보낸 메시지 삭제
const deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    const userId = req.user.userId;

    try {
        const message = await Message.findById(messageId);
        // 메시지 존재 여부 확인
        if (!message) {
            return res
                .status(404)
                .json({ message: '메시지를 찾을 수 없습니다.' });
        }

        // 삭제 권한 확인
        if (message.sender.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ message: '삭제할 권한이 없습니다. ' });
        }

        await message.deleteOne();

        res.status(200).json({ message: '메시지 삭제 성공' });
    } catch (err) {
        res.status(500).json({
            message: '삭제할 수 없습니다. ',
            error: err.message,
        });
    }
};

module.exports = { getMessageByRoom, deleteMessage };
