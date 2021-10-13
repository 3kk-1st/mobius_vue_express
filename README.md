# mobius_vue_express

mobius connect vue , express , ncube


9/28 slack connect!


사용한 튜토리얼들:
* https://medium.com/hivelab-dev/vue-express-mysql-part1-98f68408d444
* https://medium.com/hivelab-dev/vue-express-mysql-part2-6d8fc0e497de
* https://medium.com/hivelab-dev/vue-express-mysql-part3-3161bbb6c624

프로그램 설치: 
vue-cli를 통해서 프로젝트 생성

mosquitto mqtt: sudo apt-get install mosquitto 
mosquitto config file:

파일별 프로그램 설명:

frontend:
* 코드를 바꿀때마다 npm run build
* src/router/index.js은 url 라우팅을 담당합니다
* src/components 페이지마다 컴포넌트가 있습니다 src/router/index.js에서 설명을 해놨습니다 
* plugins/vuetify.js 이 페이지가 있어야지 vuetify가 돌아갑니다. vuetify는 vue.js를 위한 많은 ui library 중 하나입니다. 
  * https://vuetifyjs.com/en/

backend:
* npm run build 를 frontend에서 실행한다음에 npm run start 실행하면 업데이트 된 코드가 실행이 된다
* app.js 파일이 메인 파일입니다. express 서버가 있고, 그리고 express 서버를 위한 REST API 라우팅이 되있습니다.
* public 폴더 안에는 프론트단에서 npm run build로 패키지된 html css javascript 가 있습니다. 

