import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import hello from '../components/Hello.vue'
import home from '../components/Home.vue'
import record from '../components/Record.vue'
import paymore from '../components/PayMore.vue'
import incomemore from '../components/IncomeMore.vue'
import budget from '../components/Budget.vue'
import login from '../components/Login.vue'
import register from '../components/Register.vue'
import lookPSD from '../components/LookPSD.vue'
import setnewPSD from '../components/SetNewPSD.vue'
import personal from '../components/Personal.vue'
import addmember from '../components/AddMember.vue'
import changename from '../components/ChangeName.vue'
import changetel from '../components/ChangeTel.vue'
import detail from '../components/Detail.vue'
import checkdetails from '../components/CheckDetails.vue'
import showdetails from '../components/ShowDetails.vue'
//利用import 将组件导入
Vue.use(Router)
//设置路由地图
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
      },
      {
        path:'/login',
        component:login
      },
      {
        path:'/register',
        component:register
      },
      {
        path:'/lookPSD',
        component:lookPSD
      },
      {
        path:'/setnewPSD',
        component:setnewPSD
      },
      {
        path:'/personal',
        component:personal
      },
      {
        path:'/addmember',
        component:addmember
      },
      {
        path:'/changename',
        component:changename
      },
      {
        path:'/changetel',
        component:changetel
      },
      {
        path:'/detail',
        component:detail
      },
      {
        path:'/checkdetails',
        component:checkdetails
      },
      {
        path:'/showdetails',
        component:showdetails
      }
    ]
  }
]
