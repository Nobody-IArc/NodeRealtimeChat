// 사용자 모델 설계

const mongoose = require('mongoose');

// JSDoc
/**
 * @typedef {Object} ChatUserSchema
 * @property {import('mongoose').Types.ObjectId} _id
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

// mongoose 모듈 사용
const chatUserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

/** @type {import('mongoose').Model<ChatUserSchema>} */
module.exports = mongoose.model('ChatUser', chatUserSchema);
