// 운세 관련 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getDailyFortune,
    getFortuneCookie,
} = require('../controllers/fortuneController');

router.get('/daily', authMiddleware, getDailyFortune);
router.get('/fortune-cookie', authMiddleware, getFortuneCookie);

module.exports = router;
