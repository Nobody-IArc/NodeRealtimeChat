// 채팅방 내부의 메시지 모델

const mongoose = require('mongoose');

const messageModel = new mongoose.Schema(
    {
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatRoom',
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatUser',
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageModel);
