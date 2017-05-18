/**
 * Created by lxiangz on 2017/4/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const instance = axios.create({
  baseURL:"http://172.16.99.106:8080/user/",
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
  }
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
    phoneIsExist:null,//手机账号是否存在
    isRegister:null,//是否注册成功
    isLogin:null,//是否登陆成功
    isSetNewPsd:null,//是否设置新密码成功
    isChangeName:null,//是否修改昵称成功
    isChangeTel:null,//是否修改手机号成功
    isGetCode:null,//验证码是否发送成功


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
        'sendSMS',{
        "phone":text
      })
        .then(function(response){
          console.log(response);
          if(response.status==200){
            var res=response.data;
            if(res.code===200){
              state.isGetCode=true;
              state.testCode=res.message;
            }else if(res.code===400){
              state.isGetCode=false;
            }
          }
        })
        .catch(function(err){
          console.log(err);
        });
    },
    //验证账号是否存在
    confirmPhone(state,text){
      instance.post(
        'testPhone',{
          phone:text
        })
        .then(function(response){
          console.log(response);
          if(response.status==200){
            var res=response.data;
            if(res.code==404){
              state.phoneIsExist=false;
            }else{
              state.phoneIsExist=true;
            }
          }
          console.log(state.phoneIsExist);
        })
        .catch(function(err){
          console.log(err);
        });
    },

    //注册
    register(state,text){
      instance.post(
        'register',text)
        .then(function(response){
          if(response.status==200){
            var res=response.data;
            if(res.code==404){
              state.isRegister=false;
            }else{
              state.isRegister=true;
            }
          }
        })
        .catch(function(err){
          console.log(err);
        });
    },
    //登陆
    login(state,text){
      if(text.password==""){
        state.isLogin=true;
       state.cellphone=text;
      }else{
        //请求密码 比较密码
        instance.post(
          'login',{
            phone:text.phone,
            password:text.password
          })
          .then(function(response){
            console.log(response);
            if(response.status==200){
              var res=response.data;
              if(res.code==404){
                state.isLogin=false;
              }else{
                state.isLogin=true;
              }
            }
          })
          .catch(function(err){
            console.log(err);
          });
      }

    },
    //设置新密码
    setNewPsd(state,text){
      instance.post(
        'setNewPSD',{
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
    //设置手机号
    setCellPhone(state,text){
     state.cellphone=text;
    },
    //修改昵称
    setName(state,text){

    },
    //修改手机号
    setPhone(state,text){

    }
  },
  //Getters 允许组件从 Store 中获取数据
  getters: {
  }
})
