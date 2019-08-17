import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'

Vue.config.productionTip = false

// 定义在Vue原型上,为了不冲突,名字为$http
// 之后就能在任意的vue页面使用$http方法
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3001/api'//根路径(接口地址)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
