## 진행 내역

### Backend

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
|03.28 - 5|Message 모델 생성 및 관련 모듈 생성|45%|Message 컨트롤러, 라우터 생성 및 페이징을 위한 내부 정렬, DB에 Message 저장 기능|
|03.28 - 6|Message 삭제 기능 및 라우터 구조 설정|48%|실시간 메시지에 수정 기능은 불필요하다 생각하여 구현하지 않았음| 
|03.28 - 7|채팅방 퇴장 기능 및 User의 채팅방 입퇴장 시 알림 기능 구현|50%|Socket에 알림을 전송 후 공지나 알림 방식으로 다른 사용자들에게 전송할 예정 - 추가로 알림 없이 나가기 기능 추가 가능|
|---|---|---|---|
|03.29|권한 확인 후 채팅방 삭제 기능 추가|53%|채팅방의 삭제 시 알림, 소켓 처리는 프런트 작업 중 방식 최종 결정 예정|
|03.29 - 2|권한 확인 후 채팅방 수정 기능 추가|55%|채팅방 수정 기능 추가, 알림 여부는 추후 필요시 생성 예정|
|03.29 - 3|채팅방에 참여중인 사용자 목록 조회 기능 추가|57%|채팅방 속한 상태가 아닐 시에는 총 인원 수만 보여주는 기능 추가 예정|
|03.29 - 4|채팅방의 관리자 권한이 있는 사용자가 다른 참여자 강제 퇴장 기능 추가|60%|투표를 통한 퇴장 기능 추가?|
|---|---|---|---|
|03.30|사용자의 개인 페이지에 블로그 형식 지원을 위한 기본 API 설계 및 추가|63%|게시글 형태 생성, 추가로 검색 및 스레드 형식으로 랜덤 피드(?) 기능 추가?|
|03.30 - 2|오늘의 운세 기능 추가 시작|65%|dayjs 모듈 사용으로 하루 한 번만 요청 가능, redis 연결 예정|
|03.30 - 3|중간 점검 및 테스터들에게 기능 추가 및 보완 피드백|---|결과 바탕으로 수정 및 추가 예정|
|03.30 - 4|JSDoc 사용 시작|---|앞으로도 타입 추론 등의 문제를 위해 사용|
