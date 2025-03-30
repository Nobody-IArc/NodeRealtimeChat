// 타로 카드 컨트롤러

/**
 *
 * @typedef {Object} TarotCard
 * @property {number} number
 * @property {string} name
 * @property {string} korean
 * @property {string} meaning
 * @property {string} comment
 */

/** @type {TarotCard[]} */
const tarotCards = require('../tarot/tarotCards');

// 추후 Redis 연결을 위해 미리 작성
// const redisClient = require('../configRedisConnection');

// 날짜를 가져오기 위한 dayjs 모듈
const dayjs = require('dayjs');
// 전역 언어 등록 - 한국어
require('dayjs/locale/ko');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// dayjs 설정
dayjs.extend(utc);
dayjs.extend(timezone);

const getDailyFortune = async (req, res) => {
    const userId = req.user.userId;

    // Redis 연결 용 코드
    // const redisKey = `dailyFortune:${userId}`;

    try {
        // Redis 연결 후 주석 해제
        // const exists = await redisClient.exists(redisKey);
        // if (exists) {
        //     return res.status(403).json({
        //         message:
        //             '오늘은 이미 운세를 확인했습니다. 내일 다시 시도해 주세요.',
        //     });
        // }

        const shuffledCard =
            tarotCards[Math.floor(Math.random() * tarotCards.length)];

        const nowTime = dayjs().tz('Asia/Seoul');
        const midNight = nowTime.endOf('day');
        const ttl = midNight.diff(nowTime, 'second');

        // redis 연결 후
        // await redisClient.set(redisKey, JSON.stringify(shuffledCard), 'EX', ttl);

        return res.status(200).json({
            message: '오늘의 운세 조회 성공',
            fortune: shuffledCard,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: '오늘의 운세 조회 실패', error: err.message });
    }
};

module.exports = { getDailyFortune };
