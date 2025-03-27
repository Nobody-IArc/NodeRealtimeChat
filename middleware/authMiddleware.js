// API 접근 권한 관리를 위한 미들웨어

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 요청의 헤더에서 토큰 가져오기
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: '인증되지 않은 사용자의 요청입니다.' });
    }

    // 토큰 값이 Bearer <Token> 형식으로 넘어오기 때문에 split() 메서드로 값만 추출
    const token = authHeader.split(' ')[1];

    try {
        // 토큰의 유효성 검 및 payload 값 저장
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 디버깅 용
        console.log(decoded);

        // 가독성 및 확장성을 위해 decoded 분리
        req.user = decoded;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ message: '유효하지 않은 토큰입니다.', error: err.message });
    }
};

module.exports = authMiddleware;
