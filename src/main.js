import Vue from 'vue'
import App from './App.vue'
import router from "routes/index.js";
import 'styles/main.scss';
import Element from 'element-ui'
import 'styles/element-variables.scss'
Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')