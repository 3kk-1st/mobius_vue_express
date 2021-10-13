# mobius_vue_express

mobius connect vue , express , ncube


9/28 slack connect!


사용한 튜토리얼들:
* https://medium.com/hivelab-dev/vue-express-mysql-part1-98f68408d444
* https://medium.com/hivelab-dev/vue-express-mysql-part2-6d8fc0e497de
* https://medium.com/hivelab-dev/vue-express-mysql-part3-3161bbb6c624

프로그램 설치: 
vue-cli를 통해서 프로젝트 생성
ubuntu 20.04에서 개발되었습니다. 

mosquitto mqtt: sudo apt-get install mosquitto 
mosquitto config file: <br/>
* cd /etc/mosquitto/conf.d 한 다음에
* mosquitto.conf 라는 파일이 없으면 생성합니다 
* 그 안에 이렇게 넣으면 됩니다
  * port 1883
  * listener 9001
  * protocol websockets
* 이렇게 하면 1883 포트에 그냥 mqtt 포트가 열리고
* 9001 포트에는 웹소켓 포트가 열립니다. mqtt는 웹 브라우저로 직접 통신이 불가능하기에 웹소켓을 통한 포트가 필요합니다. 


파일별 프로그램 설명:

frontend:
* 코드를 바꿀때마다 해당 폴더 안으로 cd 한 다음에 npm run build
* src/router/index.js은 url 라우팅을 담당합니다
* src/components 페이지마다 컴포넌트가 있습니다 src/router/index.js에서 설명을 해놨습니다 
* plugins/vuetify.js 이 페이지가 있어야지 vuetify가 돌아갑니다. vuetify는 vue.js를 위한 많은 ui library 중 하나입니다. 
  * https://vuetifyjs.com/en/

backend:
* npm run build 를 frontend에서 실행한다음에 백엔드 폴더 안으로 cd 한 다음에 npm run start 실행하면 업데이트 된 코드가 실행이 됩니다
  * 개발할때 vscode 터미널창을 2개 띄워놓으면 편합니다. 
* app.js 파일이 메인 파일입니다. express 서버가 있고, 그리고 express 서버를 위한 REST API 라우팅이 되있습니다.
* public 폴더 안에는 프론트단에서 npm run build로 패키지된 html css javascript 가 있습니다. 

