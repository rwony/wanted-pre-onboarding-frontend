# wanted-pre-onboarding-frontend
원티드 프리온보딩 프론트엔드 과정에 참여하게 된 지원자 이려원입니다.

## 프로젝트 실행 방법
```
git clone https://github.com/rwony/wanted-pre-onboarding-frontend.git
```
```
npm install
```
```
npm run start
```

## 배포 링크
* 데모 영상을 배포 링크로 대신합니다.
https://wanted-pre-onboarding-fr-38526.web.app/todo

## 사용한 라이브러리
* react-router
* axios
* styled-components

## 폴더 구조
```bash
├── public
├── src
│   ├── component
│   │   ├── MyHeader.js
│   │   ├── TodoList.js
│   ├── pages
│   │   ├── Home.js
│   │   ├── Signin.js
│   │   ├── Signup.js
│   │   ├── Todo.js
└── App.js
``` 

## 기능
### 로그인/회원가입 공통
- 이메일은 '@' 문자가 포함되어야 하며, 비밀번호는 8자 이상 반드시 작성
- 유효성 검사에 통과하지 못하면 회원가입/로그인 버튼에 disabled 속성 부여

### 회원가입
- 회원가입에 성공하면 ```/signin``` 경로로 이동
- ```/signup``` 페이지 접근 시 만약 토큰이 존재할 경우 ```/todo``` 경로로 리다이렉트

### 로그인
- 로그인에 성공하면 서버로 부터 받은 JWT를 'userToken'의 이름으로 로컬스토리지에 저장 후 ```/todo```경로로 이동
- ```/signin``` 페이지 접근 시 만약 토큰이 존재할 경우 ```/todo``` 경로로 리다이렉트

### 로그아웃
- 로컬스토리지에 저장된 토큰 삭제 후, ```/``` 경로로 이동

### Todo List
- 작성한 Todo List가 보여지며, 새로운 항목 추가 가능
- 체크박스 클릭시 완료 여부 수정 가능
- ```수정```버튼 클릭 시 해당 항목을 수정할 수 Input창이 활성화되며, 버튼은 ```제출``` ```취소```버튼 으로 변경됨
- ```삭제```버튼 클릭 시 해당 항목을 삭제함
- ```제출```버튼 클릭 시 변경된 내용으로 반영
- ```취소```버튼 클릭 시 작성한 내용은 변경되지 않음
- 로그인이 되어 있지 않은 상태에서 ```/todo```경로에 접근한다면 ```/```경로로 리다이렉트
