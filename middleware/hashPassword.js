// 비밀번호 해싱 미들웨어

const bcrypt = require('bcrypt');

const hashPassword = async (req, res, next) => {
    // try / catch 문으로 요청의 body 에 password 가 넘어왔는지 체크 후 작동
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        next();
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'Invalid password.', error: err.message });
    }
};

module.exports = hashPassword;
