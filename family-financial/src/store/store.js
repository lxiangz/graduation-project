/**
 * Created by lxiangz on 2017/4/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
  //state 定义了应用状态的数据结构，同样可以在这里设置默认的初始状态
  state: {
    paySelectedItem:'...',
    incomeSelectedItem:'...',
    isPay:true,
    buttonTabIndex:0
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
    }
  },
  //Getters 允许组件从 Store 中获取数据
  getters: {
  }
})
