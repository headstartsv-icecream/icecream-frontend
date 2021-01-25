# Icecream Front-End

## 기능

### 음악 녹음 및 검색

Shazam API를 이용해서 오디오 클립을 검색할 수 있다.

1. 브라우저의 마이크 권한을 얻어서 사용자로부터 오디오 파일 녹음
2. 녹음된 raw sound data를 Shazam에서 요구하는 형식으로 인코딩
3. 인코딩된 데이터를 Shazam API로 요청한 후 검색된 음악 정보를 얻음
4. 3초마다 총 4번의 요청을 보내고 중간에 응답을 받으면 그 정보를 보여줌

Shazam API에서 요구하는 형식:
44100Hz, 1 channel, signed 16-bit pcm, little endian, 500KB 이하의 RAW 파일을 base64 방식으로 인코딩한 문자열

### 음악 반응 크롤링

유튜브 및 멜론의 음악 정보에 달린 댓글을 크롤링해서 사용자에게 실시간으로 보여준다.

1. 백엔드에서 사전에 유튜브와 멜론의 음악 소개 페이지에 있는 댓글을 크롤링해서 DB에 저장
2. 이렇게 크롤링한 데이터를 읽는 기능을 백엔드에서 GraphQL API를 통해 프론트엔드에게 제공
3. 프론트엔드에서 GraphQL API를 호출해 크롤링 결과를 받아서 화면에 보여줌

사용자가 우리 페이지에 댓글을 작성할 수 있고, 그 댓글은 우리 DB에 저장된다. (댓글 CRUD)

백엔드에서 매 주기마다 해당 음악의 유튜브 공식 영상 및 멜론 댓글을 크롤링한다. 음악 리뷰 영상의 댓글은 (일단) 크롤링에서 제외한다.

댓글 노출 순위는 ‘좋아요 개수’ 등의 기준을 정한다.

### 음악 정보

- 앨범 표지 이미지
- 음악 제목
- 가수 이름
- 작곡가
- 장르
- 가사
- 여러 사이트의 댓글
- 유튜브 영상 링크, 유튜브 30초 미리보기

해당 가수가 부른 다른 노래를 보여준다.
해당 작곡가가 작곡한 다른 노래를 보여준다.

## 사용한 라이브러리

- [React](https://ko.reactjs.org/) v17
- [Next](https://nextjs.org/) v10
- [TypeScript]() v4
- [Styled Components](https://styled-components.com/) v5
- [Ant Design](https://ant.design/) v4
- Linting with [ESLint](https://eslint.org/), Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

## NPM Trends

- React, TypeScript [NPM Trends](https://www.npmtrends.com/react-vs-typescript)
- Next, Styled Component, Material-UI, Ant Design, Sanitize.css [NPM Trends](https://www.npmtrends.com/antd-vs-next-vs-styled-components-vs-sanitize.css-vs-@material-ui/core)
- Jest, React Testing Library [NPM Trends](https://www.npmtrends.com/jest-vs-@testing-library/react-vs-enzyme-vs-cypress)
- ESLint, Prettier, Husky [NPM Trends](https://www.npmtrends.com/eslint-vs-prettier-vs-husky)

## 개발 환경

- Node v14 이상 (필수)
- Git (필수)
- Yarn
- Visual Studio Code
- Chrome v86 이상
- Windows 10, macOS 11, Ubuntu 20.04 이상
