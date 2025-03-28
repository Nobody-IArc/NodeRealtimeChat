## 진행 내역

|날짜|내역|진행 상황|비고|
|:---:|:---:|:---:|:---:|
|03.27|DB 연결 및 개발 환경 설정|5%|.gitignore 및 npm i -D 로 개발에 사용될 환경 및 설정|
|03.27 - 2|User 모델 설계 및 비밀번호 암호화 기능|10%|hash 기능과 hash 비밀번호와 전송된 비밀번호가 일치하는지 확인하는 로직 구현|
|---|---|---|---|
|03.27 - 3|리파지터리 재생성|---|폴더 경로 및 파일 경로 수정|
|03.27 - 4|로그인 기능 구현|15%|추가 기능 구상 및 스케치| 
|03.27 - 5|기존 코드 리팩터링|---|책임 분리를 통해 유지 보수성 높은 코드라는 목표에 더 가깝게 변경|
|03.27 - 6|ChatRoom 모델 설계 및 인증용 미들웨어 생성|20%|Token 사용을 위한 모듈 설치 및 설정|
|---|---|---|---|
|03.28|채팅방 라우터, 컨트롤러 구현 및 전체 라우터 통합 관리 파일 생성|25%|추가 확장성 및 책임 분리 원칙 등에 따라 리팩터링|
|03.28 - 2|채팅방 컨트롤러에 전체 조회 및 검색 키워드 기반 조회 기능 추가|30%|CRUD 기능 전체 구현 (필요한 미들웨어나 추가 로직 설정) 후 socket 작업으로 넘어갈 예정|
|03.28 - 3|채팅방 컨트롤러에 채팅방 상세 조회 및 유저 입장 기능 추가|35%|Update, Delete 기능은 Message 관련 기능 구현 후에 설정 (Chatroom에 의존 관계인 Message도 같이 삭제되거나 해야할 수 있기 때문)|
|03.28 - 4|Socket 사용 설정 및 app.js 리팩터링|40%|Socket 사용을 위해 http 서버 생성 및 app.listen => server.listen 으로 수정 및 잠재적 위협 요소 수정|
