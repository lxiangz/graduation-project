// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/index'
import axios from 'axios';
import Chart from 'chart.js';
Vue.use(VueRouter)
//ajax请求设置
Vue.prototype.$instance = axios.create({
  //http://172.16.97.109:8080/
  baseURL: "http://115.159.188.223/BYSJ2017-0.0.1-SNAPSHOT/",//http://115.159.188.223/BYSJ2017-0.0.1-SNAPSHOT/
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
 withCredentials:true,
});

const router = new VueRouter({
   routes
})
FastClick.attach(document.body)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  router,
  //store,
  render: h => h(App)
}).$mount('#app-box')


