// 로그인 시의 토큰 생성g

const jwt = require('jsonwebtoken');

// 넘어온 id에 대하여 토큰 발급
const generateToken = userId => {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

module.exports = generateToken;
