// 인증 관련 라우터

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const hashPassword = require('../middleware/hashPassword');

// 경로 설정
router.post('/register', hashPassword, register);
router.post('/login', login);

module.exports = router;
