// 블로그 형식의 게시글을 제공하기 위한 모델

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ChatUser',
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
