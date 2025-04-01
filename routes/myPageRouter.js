// MyPage 용 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getTagStats } = require('../controllers/myPageController');

// 태그 통계 조회
router.get('/tagStats', authMiddleware, getTagStats);

module.exports = router;
