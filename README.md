# mobius_vue_express

dependency 설치:
1. github에서 zip파일 다운받습니다
2. cd backend --> npm install
3. cd frontend --> npm install 

구동방법:
두가지 방법이 있습니다.
1. 빌드 + 백앤드 서버 띄우기
   * cd frontend --> npm run build
   * cd backend --> npm run start (업데이트 된 빌드 코드가 실행이 됩니다)
   * 아마 로컬호스트 3000포트에 서버가 열리면 그걸 들어가면 될겁니다. 
2. vue.js 서버 cli 사용 (개발/디버깅 용도)
   * cd backend --> npm run start
   * cd frontend --> npm run serve
   * 아마 로컬호스트 8080포트에 서버가 열리면 그걸 들어가면 될겁니다. 
   * 파일을 수정하고 세이브하면 페이지가 리로딩 될겁니다. 
* 개발할때 vscode 터미널창을 2개 띄워놓으면 편합니다. 


Subscribe 해야하는 MQTT Topic: /oneM2M/req/Mobius2/S2m7DGh9dPe/json


dependency:
* Node.js version: 10.13.0
* Npm version: 6.4.1
* @vue/cli 4.5.13 을 통해서 프로젝트 생성 --> Vue 2 사용
* ubuntu 20.04에서 개발되었습니다. 

mosquitto mqtt: sudo apt-get install mosquitto <br />
VERSION: mosquitto 1.6.9 !!!!!! <br />
mosquitto config file: <br/>
* cd /etc/mosquitto/conf.d 한 다음에
* mosquitto.conf 라는 파일이 없으면 생성합니다 
* 그 안에 이렇게 넣으면 됩니다
  * port 1883
  * listener 9001
  * protocol websockets
* 이렇게 하면 1883 포트에 그냥 mqtt 포트가 열리고
* 9001 포트에는 웹소켓 포트가 열립니다. mqtt는 웹 브라우저로 직접 통신이 불가능하기에 웹소켓을 통한 포트가 필요합니다. 
* 테스팅때 사용하던 모비우스 코드는 물어보시면 드리겠습니다


사용한 튜토리얼들:
* https://medium.com/hivelab-dev/vue-express-mysql-part1-98f68408d444
* https://medium.com/hivelab-dev/vue-express-mysql-part2-6d8fc0e497de
* https://medium.com/hivelab-dev/vue-express-mysql-part3-3161bbb6c624

파일별 프로그램 설명:

frontend:
* src/router/index.js은 url 라우팅을 담당합니다
* src/components 페이지마다 컴포넌트가 있습니다 src/router/index.js에서 설명을 해놨습니다 
* plugins/vuetify.js 이 페이지가 있어야지 vuetify가 돌아갑니다. vuetify는 vue.js를 위한 많은 ui library 중 하나입니다. 
  * https://vuetifyjs.com/en/

backend:
* app.js 파일이 메인 파일입니다. express 서버가 있고, 그리고 express 서버를 위한 REST API 라우팅이 되있습니다.
* public 폴더 안에는 프론트단에서 npm run build로 패키지된 html css javascript 가 있습니다. 

