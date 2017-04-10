// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import routeConfig from './router-config'

Vue.use(MintUI)
Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: routeConfig
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
