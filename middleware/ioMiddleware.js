// 서버 측에서도 .io 인스턴스를 사용하게 만드는 미들웨어

module.exports = io => (req, res, next) => {
    req.io = io;
    next();
};
