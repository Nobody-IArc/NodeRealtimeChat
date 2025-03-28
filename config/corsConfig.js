// cors 모듈 옵션 설정

const corsOptions = {
    origin: '*', // 개발 중에만 사용될 옵션, 배포 시에는 도메인 명으로 수정할 것
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true, // 인증 정보가 포함된 요청 허용 설정
};

module.exports = corsOptions;
