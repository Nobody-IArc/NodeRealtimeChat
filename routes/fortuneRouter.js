// 운세 관련 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getDailyFortune } = require('../controllers/fortuneController');

router.get('/', authMiddleware, getDailyFortune);

module.exports = router;
