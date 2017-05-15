/**
 * Created by lxiangz on 2017/4/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const instance = axios.create({
  baseURL:"http://zhuanzhuan.name/",
});

Vue.use(Vuex)


export default new Vuex.Store({
  //state 定义了应用状态的数据结构，同样可以在这里设置默认的初始状态
  state: {
    paySelectedItem:'...',
    incomeSelectedItem:'...',
    isPay:true,
    buttonTabIndex:0,
    testCode:"",//验证码
    cellphone:"",//登陆成功的账号手机号
    phoneIsExist:false,//手机账号是否存在
    isRegister:false,//是否注册成功
    isLogin:false,//是否登陆成功
    isSetNewPsd:false,//是否设置新密码成功


  },
  //Actions 即是定义提交触发更改信息的描述
  actions: {
  },
  //mutations 是唯一允许更新应用状态的地方
  mutations: {
    changePaySelected(state,text){
      state.paySelectedItem=text;
      state.buttonTabIndex=0;
      state.isPay=true;
    },
    changeIncomeSelected(state,text){
      state.incomeSelectedItem=text;
      state.buttonTabIndex=1;
      state.isPay=false;
    },
    changePayPage(state){
      state.buttonTabIndex=0;
      state.isPay=true;
    },
    changeIncomePage(state){
      state.buttonTabIndex=1;
      state.isPay=false;
    },
    //请求验证码数据
    getTestCode(state,text){
      instance.post(
        'BYSJ2017-0.0.1-SNAPSHOT/login',{
        cellphone:text
      })
        .then(function(response){
          console.log(response);
          console.log(response.data);
        })
        .catch(function(err){
          console.log(err);
        });
    },
    //验证账号是否存在
    confirmPhone(state,text){

    },

    //注册
    register(state,text1,text2){

    },
    //登陆
    login(state,text,text2){
      if(text2==""){
        this.cellphone=text;
      }else{
        //请求密码比较密码
      }

    },
    //设置新密码
    setNewPsd(state,text){

    }
  },
  //Getters 允许组件从 Store 中获取数据
  getters: {
  }
})
