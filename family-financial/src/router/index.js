import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import hello from '../components/Hello.vue'
import home from '../components/Home.vue'
import record from '../components/Record.vue'


Vue.use(Router)

export default [
  {
    path:'/',
    component:App,
    children: [
      {
        path:'',
        redirect:'/hello'
      },
      {
        path:'/hello',
        component: hello
      },
      {
        path:'/home',
        component: home
      },
     {
        path:'/record',
        component:record
      }
    ]
  }
]
