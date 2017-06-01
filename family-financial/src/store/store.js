/**
 * Created by lxiangz on 2017/4/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //state 定义了应用状态的数据结构，同样可以在这里设置默认的初始状态
  state: {
    isLoginSuccess:false,//是否已登陆
    todayDate:"",//
    page:"",//
    //record页面
    paySelectedItem:'...',
    incomeSelectedItem:'...',
    isPay:true,
    buttonTabIndex:0,
    //record的录入数据保存
    money:"0.0",//输入金额
    remark:"",//备注
    selectedDate:"",//选中日期

    //detail页面
    detailSelectedItem:"全部",

    //detail的页面数据保存
    startDate:"",
    endDate:"",
    selectedMember:"家庭公共",
    selectedItem:"全部",

    //查询条件保存
    checkStartDate:"",
    checkEndDate:"",
    checkMember:"",
    checkItem:"",
    checkItemDetail:"",


  },
  //Actions 即是定义提交触发更改信息的描述
  actions: {
  },
  //mutations 是唯一允许更新应用状态的地方
  mutations: {
    changePaySelected(state,text){
      state.paySelectedItem=text;
    },
    changeIncomeSelected(state,text){
      state.incomeSelectedItem=text;
    },
    changeRecordState(state,text){
      state.money="0.0";
      state.remark="";
      state.selectedDate=state.todayDate
      state.isPay=text;
    },
    saveRecordData(state,text){
      state.money=text.money;
      state.remark=text.remark;
      state.selectedDate=text.selectedDate
    },
    //设置今天时间
    setTodayDate(state,text){
      state.todayDate=text;
    },
    //改变登录状态
    changeLoginState(state,text){
      state.isLoginSuccess=text;
    },

    //改变页面
    changePage(state,text){
      state.page=text;
    },
    changeDetailSelected(state,text){
      state.detailSelectedItem=text;
    },
    detailDate(state){
      state.startDate="";
      state.endDate="";
      state.selectedMember="家庭公共";
      state.selectedItem="全部";
      state. detailSelectedItem="全部"
    },
    saveDetailData(state,text){
      state.startDate=text.startDate;
        state.endDate=text.endDate;
        state.selectedMember=text.selectedMember;
       state.selectedItem=text.selectedItem;
    },


    //查询条件
    saveCheckOptions(state,text){
      state.checkStartDate=text.checkStartDate;
      state.checkEndDate=text.checkEndDate;
      state.checkMember=text.checkMember;
      state.checkItem=text.checkItem;
      state.checkItemDetail=text.checkItemDetail;
    }

  },
  //Getters 允许组件从 Store 中获取数据
  getters: {
  }
})
