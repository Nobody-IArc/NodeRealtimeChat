// 채팅방 컨트롤러

const ChatRoom = require('../models/ChatRoom');
const ChatUser = require('../models/ChatUser');

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

// 선택된 채팅방 상세 조회
const getChatRoomById = async (req, res) => {
    const { id } = req.params;

    try {
        const chatRoom = await ChatRoom.findById(id);
        if (!chatRoom) {
            return res
                .status(404)
                .json({ message: '존재하지 않는 채팅방입니다.' });
        }
        res.status(200).json({
            message: '조회 성공',
            chatRoom: {
                _id: id,
                name: chatRoom.roomName,
                description: chatRoom.description,
                image: chatRoom.titleImage,
                creator: chatRoom.roomCreator,
                participantCount: chatRoom.participants.length,
            },
        });
    } catch (err) {
        res.status(500).json({
            message: '조회 실패',
            error: err.message,
        });
    }
};

// 채팅방 입장
const joinChatRoom = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const chatRoom = await ChatRoom.findById(id);

        // 채팅방이 존재하는지 확인
        if (!chatRoom) {
            return res
                .status(404)
                .json({ message: '존재하지 않는 채팅방입니다.' });
        }

        // 중복 참여 확인
        const alreadyJoinedChatRoom = chatRoom.participants.includes(userId);
        if (!alreadyJoinedChatRoom) {
            return res.status(200).json({
                message: '이미 참여 중인 채팅방입니다.',
            });
        }

        // 채팅방 존재 여부 및 중복 참여 여부 확인 이후
        chatRoom.participants.push(userId);
        await chatRoom.save();

        res.status(200).json({
            message: '채팅방 참여 성공',
            participants: chatRoom.participants.length,
        });
    } catch (err) {
        res.status(500).json({ message: '입장 실패', error: err.message });
    }
};

// 채팅방 퇴장
const leaveChatRoom = async (req, res) => {
    const userId = req.user.userId;
    const roomId = req.params.id;

    try {
        const chatRoom = await ChatRoom.findById(roomId);

        // 채팅방 존재 여부 확인
        if (!chatRoom) {
            return res
                .status(404)
                .json({ message: '채팅방을 찾을 수 없습니다. ' });
        }

        // 채팅방에 존재하는 참여자인지 확인
        if (!chatRoom.participants.includes(userId)) {
            return res
                .status(400)
                .json({ message: '채팅방에 존재하지 않는 사용자입니다.' });
        }

        const user = await ChatUser.findById(userId);

        // 필터를 통해 참여자 목록 제거 후 새롭게 반환
        chatRoom.participants = chatRoom.participants.filter(
            participant => participant.toString() !== userId
        );

        await chatRoom.save();

        // 소켓에 알림 전송
        req.io.to(roomId).emit('userLeaveRoom', {
            userId: userId,
            username: user.username,
            message: `${user.username} 님이 방을 나가셨습니다.`,
        });

        return res.status(200).json({ message: '채팅방 나가기 성공' });
    } catch (err) {
        return res.status(500).json({
            message: '채팅방을 나갈 수 없습니다.',
            error: err.message,
        });
    }
};

module.exports = {
    createChatRoom,
    getAllChatRooms,
    getChatRoomById,
    joinChatRoom,
    leaveChatRoom,
};
