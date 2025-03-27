// app.js 메인 파일

const express = require('express');
const dotenv = require('dotenv');

// 직접 만든 라우터
const router = require('./routes');

// 설정 파일 및 미들웨어
const dbConnect = require('./config/dbConnection');

// app 객체에 express 서버 할당
const app = express();

// 환경 변수 관리
dotenv.config();

// DB 연결
await dbConnect();

// JSON 형식 및 Form 데이터 변환을 위한 모듈 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 경로 지정 - 추후에 index.js 등의 파일로 통합 및 분리 예정 - 완료
// 확장성 및 설정을 위해 '/api' 경로 설정
app.use('/api', router);

// 환경 변수에서 존재하는 포트 혹은 3000 번 포트로 실행
const port = process.env.PORT || 3000;

// 서버 실행
app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});
