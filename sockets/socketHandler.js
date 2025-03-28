// Socket 서버를 관리할 핸들러

const Message = require('../models/message');

module.exports = io => {
    io.on('connection', socket => {
        console.log(`소켓 연결 성공: ${socket.id}`);

        // 채팅방 참여
        socket.on('joinRoom', roomId => {
            socket.join(roomId);
            console.log(`${socket.id} 이(가)  ${roomId} 에 참여했습니다.`);
        });

        // 메시지 전송
        socket.on('sendMessage', async data => {
            const { roomId, content, sender } = data;

            // DB에 메시지 저장
            try {
                const savedMessage = new Message({
                    room: roomId,
                    sender: sender,
                    content: content,
                });
                await savedMessage.save();
            } catch (err) {
                console.error('메시지 저장 실패 ', err.message);
            }

            // 메시지 수신
            io.to(roomId).emit('receiveMessage', {
                content,
                sender,
                createdAt: new Date(),
            });
        });

        // 소켓 연결 해제
        socket.on('disconnect', () => {
            console.log(`소켓 연결 해제: ${socket.id}`);
        });
    });
};
