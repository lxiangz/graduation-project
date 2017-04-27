import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import hello from '../components/Hello.vue'
import home from '../components/Home.vue'
import record from '../components/Record.vue'
import paymore from '../components/PayMore.vue'
import incomemore from '../components/IncomeMore.vue'
import budget from '../components/Budget.vue'



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
      },
      {
        path:'/paymore',
        component:paymore
      },
      {
        path:'/incomemore',
        component:incomemore
      },
      {
        path:'/budget',
        component:budget
      }
    ]
  }
]
