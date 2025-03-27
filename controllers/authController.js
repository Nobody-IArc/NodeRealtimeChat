// 회원 가입 및 인증 관리 컨트롤러

const ChatUser = require('../models/ChatUser');
const generateToken = require('../utils/generateToken');
const comparePassword = require('../utils/comparePassword');

// 회원 가입
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 필수 입력 갑 체크
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: '필수 입력 값이 누락되었습니다.' });
        }

        // 중복 가입 방지 - 이메일로 체크
        const checkDuplicate = await ChatUser.findOne({ email: email });
        if (checkDuplicate) {
            return res
                .status(409)
                .json({ message: '이미 등록된 사용자입니다.' });
        }

        const newUser = new ChatUser({ username, email, password });
        await newUser.save();

        res.status(201).json({
            message: '성공적으로 가입되었습니다.',
            userId: newUser._id,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: '회원 가입 실패', error: err.message });
    }
};

// 로그인
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: '이메일과 비밀번호를 입력해야합니다.' });
        }

        // 이메일 또는 비밀번호가 잘못되었다는 알림을 통해 보안 강화
        const loggedInUser = await ChatUser.findOne({ email: email });
        if (!loggedInUser) {
            return res
                .status(401)
                .json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
        }

        const checkPassword = await comparePassword(
            password,
            loggedInUser.password
        );
        if (!checkPassword) {
            return res
                .status(401)
                .json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
        }

        const token = await generateToken(loggedInUser._id);

        res.status(200).json({
            message: '로그인 성공',
            token,
            user: {
                id: loggedInUser._id,
                username: loggedInUser.username,
                email: loggedInUser.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
    }
};

module.exports = { register, login };

// 비밀번호 조건 설정 및 확인 기능 추가?
// 이메일 인증 후 본인 확인 요청 및 비밀번호 재설정 기능?
