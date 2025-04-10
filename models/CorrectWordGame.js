// 단어 맞추기 게임 기능 모델 설계

const mongoose = require('mongoose');

// JSDoc
/**
 * @typedef {Object} CorrectWordGameSchema
 * @property {import('mongoose').Types.ObjectId} _id
 * @property {string} name
 * @property {import('mongoose').Types.ObjectId[]} [players]
 * @property {import('mongoose').Types.ObjectId} host
 * @property {string} word
 * @property {string} status
 * @property {number} maxPlayers
 * @property {[import('mongoose').Types.ObjectId, string]} guesses
 * @property {import('mongoose').Types.ObjectId} winner
 */

const CorrectWordGameSchema = new mongoose.Schema(
    {
        // 게임을 진행할 방 이름 - 추후 구조 수정 가능성 존재
        name: {
            type: String,
            required: true,
            trim: true,
        },
        // 참가자 목록
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ChatUser',
            },
        ],
        // 방을 생성한 사람
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatUser',
            required: true,
        },
        // 정답이 될 단어, required: false 로 둬 게임 준비중 상태 대비
        word: {
            type: String,
            required: false,
        },
        // 게임을 진행하는 방의 현재 상황
        status: {
            type: String,
            enum: ['Waiting', 'Playing', 'Finished'],
            default: 'Waiting',
        },
        // 최대 참가자 수 제한
        maxPlayers: {
            type: Number,
            default: 8,
            min: 2,
            max: 8,
        },
        // 질문 항목 (출제자와 정답 단어) - 추후 확장성 (가장 먼저 정답을 맞춘 참가자 등) 을 위해 timestamp Date.now 로 추가
        guesses: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'ChatUser',
                },
                word: {
                    type: String,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        // 승자 - 추후 포인트 및 랭킹 시스템 생성 시 필요
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatUser',
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.Model('CorrectWordGame', CorrectWordGameSchema);
