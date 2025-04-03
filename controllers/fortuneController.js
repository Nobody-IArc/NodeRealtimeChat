// 운세 관련 컨트롤러

// JSDoc 사용 - JavaScript 에서 타입 힌트를 제공 하여 TypeScript 에 비해 생기는 약점 보완
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
const tarotCards = require('../fortunes/tarotCards');

/** @type {string[]} */
const fortuneCookies = require('../fortunes/fortuneCookies');

// Redis 연결 코드
const redisConnect = require('../config/redisConnection');

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

    // Redis 에 저장할 key 이름 설정
    const redisKey = `dailyFortune:${userId}`;

    try {
        // Redis 에 해당 유저가 오늘 기능 사용했을 경우 key 가 남아있을 것을 감안
        const exists = await redisConnect.exists(redisKey);
        if (exists) {
            return res.status(403).json({
                message:
                    '오늘은 이미 운세를 확인했습니다. 내일 다시 시도해 주세요.',
            });
        }

        // 랜덤 추출 카드
        const shuffledCard =
            tarotCards[Math.floor(Math.random() * tarotCards.length)];

        // 현재 시각
        const nowTime = dayjs().tz('Asia/Seoul');

        // 자정 시간 받아오기
        const midNight = nowTime.endOf('day');

        // 현재 시각과 자정 시간을 비교 하여 Redis 에 저장할 시간 추출
        const ttl = midNight.diff(nowTime, 'second'); // TTL: Time To Live - 객체가 유효한 시간

        // Redis 에 저장
        await redisConnect.set(
            redisKey,
            JSON.stringify(shuffledCard),
            'EX', // Expire 옵 - 만료 시간 초 단위 지정
            ttl
        );

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

// 포춘 쿠키 기능
const getFortuneCookie = async (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * fortuneCookies.length);
        const innerMessage = fortuneCookies[randomIndex];

        if (!innerMessage) {
            return res
                .status(404)
                .json({ message: '해당 인덱스 결과 조회 실패' });
        }

        res.status(200).json({
            message: '포춘 쿠키 조회 성공',
            fortuneCookie: innerMessage,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: '포춘 쿠키 조회 실패', error: err.message });
    }
};

module.exports = { getDailyFortune, getFortuneCookie };
