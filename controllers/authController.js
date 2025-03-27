// 회원 가입 및 인증 관리 컨트롤러

const ChatUser = require('../models/ChatUser');
const hashPassword = require('../middleware/hashPassword');

// 회원 가입
const register = async (req, res) => {
    const { username, email } = req.body;

    try {
        // 필수 입력 갑 체크
        if (!username || !email) {
            return res
                .status(400)
                .json({ message: '필수 입력 값이 누락되었습니다.' });
        }

        // 중복 가입 방지
        const checkDuplicate = await ChatUser.findOne({ username: username });
        if (checkDuplicate) {
            return res
                .status(409)
                .json({ message: '이미 등록된 사용자입니다.' });
        }

        // 입력 받은 패스워드 해시
        const hashedPassword = await hashPassword(req);
        const newUser = new ChatUser({ username, email, hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: '성공적으로 가입되었습니다.',
            userId: newUser._id,
        });
    } catch (err) {
        return res.status(500).json({ message: '회원 가입 실패', error: err });
    }
};

module.exports = register;

// 비밀번호 조건 설정 및 확인 기능 추가?
