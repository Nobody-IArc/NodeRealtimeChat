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

// 모든 채팅방 조회 - 검색 키워드가 있는 경우 필터 적용
const getAllChatRooms = async (req, res) => {
    const { keyword = '', filter = 'all' } = req.query;

    try {
        let query = {};

        if (keyword.trim()) {
            const regex = new RegExp(keyword, 'i'); // 'i' 로 대 소문자 구분 없이 검

            // 필터 별로 정규식 적용
            if (filter === 'title') {
                query.name = regex;
            } else if (filter === 'description') {
                query.description = regex;
            } else if (filter === 'all') {
                query = {
                    $or: [{ name: regex }, { description: regex }],
                };
            }
        }

        const chatRooms = await ChatRoom.find(query)
            .populate('roomCreator')
            .sort({ createdAt: -1 });

        res.status(200).json({ message: '조회 성공', chatRooms: chatRooms });
    } catch (err) {
        res.status(500).json({
            message: '조회 실패',
            error: err.message,
        });
    }
};

module.exports = { createChatRoom, getAllChatRooms };
