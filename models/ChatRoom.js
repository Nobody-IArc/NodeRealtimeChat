// 채팅방 모델 설계

const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
        // 채팅방 이름
        roomName: {
            type: String,
            required: true,
            trim: true,
        },
        // 채팅방 설명 - default: '' 추가
        description: {
            type: String,
            required: false,
            trim: true,
            default: '',
        },
        // 채팅방 타이틀 사진
        titleImage: {
            type: String,
            required: false,
            default: '',
        },
        // 채팅방 생성자
        roomCreator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatUser',
            required: true,
        },
        // 채팅방 참여 사용자 리스트
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ChatUser',
                required: false,
                default: '',
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
