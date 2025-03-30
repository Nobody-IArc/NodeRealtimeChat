// app.js 에 라우터를 모듈화 해서 보낼 모듈

const express = require('express');
const router = express.Router();

// 라우터 가져오기
const authRouter = require('./authRouter');
const chatRoomRouter = require('./chatRoomRouter');
const messageRouter = require('./messageRouter');
const postRouter = require('./postRouter');

// 라우터 경로 지정
router.use('/auth', authRouter);
router.use('/chat-room', chatRoomRouter);
router.use('/chat-room', messageRouter);
router.use('/post', postRouter);

module.exports = router;
