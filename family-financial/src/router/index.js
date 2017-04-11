import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import home from '../components/Home.vue'
import hello from '../components/Hello.vue'


Vue.use(Router)

export default [
  {
    path:'/',
    component:App,
    children: [
      {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        component: home
      },
      {
        path:'/hello',
        component: hello
      }
    ]
  }
]
