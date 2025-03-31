// 채팅방 내부의 메시지 모델

const mongoose = require('mongoose');

// JSDoc
/**
 * @typedef {Object} MessageSchema
 * @property {import('mongoose').Types.ObjectId} _id
 * @property {import('mongoose').Schema.Types.ObjectId} room
 * @property {import('mongoose').Schema.Types.ObjectId} sender
 * @property {string} content
 */

const messageSchema = new mongoose.Schema(
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

/** @type {import('mongoose').Model<MessageSchema>} */
module.exports = mongoose.model('Message', messageSchema);
