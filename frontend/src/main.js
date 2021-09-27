import Vue from 'vue'
import App from './App.vue'
import {router}  from './routes/index.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios; //inject axios into $http
Vue.config.devtools = true

export const eventBus = new Vue(); //global event bus

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
