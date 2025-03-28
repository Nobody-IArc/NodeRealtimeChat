// app.js 메인 파일

const express = require('express');
const http = require('http'); // 소켓 용 서버
const Socket = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

// cors 설정 및 socket 핸들러
const corsOptions = require('./config/corsConfig');
const socketHandler = require('./sockets/socketHandler');

// 라우팅 경로를 모듈화 해서 받아온 라우터
const router = require('./routes');

// 설정 파일 및 미들웨어
const dbConnect = require('./config/dbConnection');

// app 객체에 express 서버 할당
const app = express();
// Socket 사용을 위한 서버
const server = http.createServer(app);

// dbConnect() 사용을 위해 startServer 분리
const startServer = async () => {
    // 환경 변수 관리
    dotenv.config();

    // DB 연결
    await dbConnect();

    // JSON 형식 및 Form 데이터 변환을 위한 모듈 사용
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsOptions));

    // 라우터 경로 지정 - 추후에 index.js 등의 파일로 통합 및 분리 예정 - 완료
    // 확장성 및 설정을 위해 '/api' 경로 설정
    app.use('/api', router);

    // socket 서버 설정
    const io = new Socket(server, { cors: corsOptions });

    // 소켓 핸들러 등록
    socketHandler(io);

    // 환경 변수에서 존재하는 포트 혹은 3000 번 포트로 실행
    const port = process.env.PORT || 3000;

    // 서버 실행 - Socket 사용으로 app -> server 로 변경
    server.listen(port, () => {
        console.log(`App listening on port ${port}.`);
    });
};

// 서버 실행 중 오류 체크
void (async () => {
    try {
        await startServer();
    } catch (err) {
        console.error('서버 실행 에러', err);
    }
})();
