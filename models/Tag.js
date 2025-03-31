// ChatRoom 에 속할 Tag - 추가로 User MyPage 구현 시 분석용 데이터로 사용할 예정
// 기존 utils/tags.js 파일 대체

const mongoose = require('mongoose');

/**
 * @typedef {Object} TagSchema
 * @property {string} name
 * @property {string} showName
 * @property {string} [description]
 * @property {string} [commentForUser]
 * @property {string} [icon]
 */

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        showName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            default: '',
        },
        commentForUser: {
            type: String,
            required: false,
            default: '아직 작성되지 않은 코멘트입니다.',
        },
        icon: {
            type: String,
            required: false,
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Tag', tagSchema);
