// 채팅방 컨트롤러

const ChatRoom = require('../models/ChatRoom');

// 채팅방 생성
const createChatRoom = async (req, res) => {
    const { roomName, roomDescription, roomTitleImage } = req.body;

    // roomName 이 넘어왔는지 확인
    if (!roomName) {
        return res
            .status(400)
            .json({ message: '채팅방 이름은 반드시 설정해야 합니다.' });
    }

    try {
        // req 에서 받아온 값으로 새로운 도큐먼트에 값 매핑
        const newChatRoom = new ChatRoom({
            roomName: roomName,
            description: roomDescription,
            titleImage: roomTitleImage,
            roomCreator: req.user.userId, // JWT 인증에서 받아온 ID
            participants: [req.user.userId], // 참여자 리스트에 초기 값으로 생성한 사용자를 추가
        });

        // 새롭게 저장 - 추후에 리팩터링 시 create() 메서드 사용 고려 중
        await newChatRoom.save();

        // 응답
        res.status(201).json({
            message: '채팅방 생성 성공',
            chatRoom: newChatRoom,
        });
    } catch (err) {
        res.status(500).json({
            message: '채팅방 생성 실패',
            error: err.message,
        });
    }
};

module.exports = { createChatRoom };
