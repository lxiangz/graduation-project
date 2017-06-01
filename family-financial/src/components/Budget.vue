<template>
  <div class="budget">
    <x-header :left-options="{backText: '设置预算'}"></x-header>
    <inline-calendar
      v-model="currentDate"
      hide-week-list
      >
    </inline-calendar>
    <div class="total">
      <group gutter="0" style="width:100%">
        <cell  title="总预算" :value="budgets"></cell>
      </group>
      <div class="use">
        <span>{{use}}</span>
        <span>已用</span>
      </div>
      <div class="un-use">
        <span>{{unUse}}</span>
        <span>可用</span>
      </div>
      </div>
    <group gutter="0" style="width:100%;border-top:15px solid #DCDCDC">
      <cell  title="管理详细预算:" style="font-weight:bold;color:darkgreen; font-size: larger" >
        <div slot="default"><icon type="success-no-circle" @click.native="save"></icon></div>
      </cell>
      <x-input :title="payItemText" v-model="detailMoney" placeholder="请输入金额" :show-clear="false" >
        <div slot="right">
          <x-button  type="primary" style="height:35px;border-radius:99px;font-size:15px;" action-type="button" @click.native="selectPay" >选择支出项</x-button>
        </div>
      </x-input>
    </group>

    <confirm v-model="isSaveShow"
             title=""
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
            >
      <div slot="default">
        <icon type="safe_warn" is-msg></icon><br><br>
        <span style="font-size:18px;">当前修改的是{{changeItem}}预算:{{changeItemMoney}}<br>是否修改为{{detailMoney}}?</span>
      </div>
    </confirm>
    <picker v-if="isShow" v-model="payItem" :data="payItems" @on-change="payItemChange"></picker>

    <group gutter="0" style="width:100%;border-top:15px solid #DCDCDC">
      <cell  title="详细预算:"  style="font-weight:bold;color:darkgreen;font-size: larger" ></cell>
      <scroller lock-x height="-380">
        <cell  is-link v-for="(item,$index) of budgetDetail" :key="item.id">
          <img slot="icon" width="45px" :src="item.img" />
          <div   slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">{{item.name}}</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">{{item.balance}}</span>
            <x-progress :percent="item.percent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 {{item.budget}}</span>
          </div>
        </cell>
      </scroller>
    </group>
    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>


    </div>
</template>
<script type="es6">
import {XHeader,Group,Cell,Icon,XInput,InlineCalendar,Picker,XButton,XProgress,Scroller,Confirm,Toast} from 'vux'
const payItems=['餐饮', '交通', '购物', '娱乐', '医教', '居家', '投资', '人情', '生意'];
export default{
  data(){
    return{
      currentDate:"",//当前选中日期，默认为空，即选中当天日期
      budgets:"450",//总预算
      use:"100",//已用
     unUse:"350",//未用
      detailMoney:"0.0",//输入金额
      isSaveShow:false,//修改确认框是否显示
      isShow:false,//预算项选择框是否显示
      payItem:[""],//当前选择的某一预算项
      payItems:[['餐饮', '交通', '购物', '娱乐', '医教', '居家', '投资', '人情', '生意']],//全部预算项
      payItemText:"餐饮金额：",
      //每一项预算百分比、余额、预算
      budgetDetail:[
        {name:"餐饮",budget: "50",percent:20,balance: "20",img:"../../static/img/food.png"},{name:"交通",budget: "50",percent:20,balance: "20",img:"../../static/img/traffic.png"},{name:"购物",budget: "50",percent:20,balance: "20",img:"../../static/img/shop.png"},
        {name:"娱乐",budget: "50",percent:20,balance: "20",img:"../../static/img/play.png"}, {name:"医教",budget: "50",percent:20,balance: "20",img:"../../static/img/hospital.png"},{name:"居家",budget: "50",percent:20,balance: "20",img:"../../static/img/home.png"},
        {name:"投资",budget: "50",percent:20,balance: "20",img:"../../static/img/mana-mon.jpg"},{name:"人情",budget: "50",percent:20,balance: "20",img:"../../static/img/favor.png"},{name:"生意",budget: "50",percent:20,balance: "20",img:"../../static/img/business.jpg"},
      ],

      //提示信息框设置
      toastText:"",
      toastShow:false,
      toastType:"warn",

      //修改信息确认
      changeItem:"餐饮",
      changeItemMoney:"0.00"

    }
  },
  methods:{
    selectPay(){
      if(this.isShow){
        this.isShow=false;
      }else{
        this.isShow=true;
      }
      console.log("sss");
    },
    payItemChange(){
      //this.isShow=false;
     this.changeItem=this.payItem[0];
      console.log("ddd");
      this.payItemText=this.payItem[0]+"金额："
    },
    save(){
      //金额设置
      var num =/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,1})?$/;
      var re = new RegExp(num);
      var money=this.detailMoney;
      if(money==""){
        this.toastShow=true;
        this.toastType="warn";
        this.toastText="金额不能为空";
      }else if(money<0){
        this.toastShow=true;
        this.toastType="warn";
        this.toastText="金额不能小于0";
      }else if(re.test(money)){
        this.toastShow=true;
        this.toastType="default";
        this.toastText="金额格式正确";
       this.isSaveShow=true;
      }else {
        this.toastShow=true;
        this.toastType="warn";
        this.toastText="金额格式错误";
      }

    },
    onCancel(){
      this.isSaveShow=false;
    },
    onConfirm(){
      //执行请求，修改预算，同步更新显示数据
      this.isSaveShow=false;
      this.reload();
    },
    //重新加载方法
    reload(){
      //获取请求数据，更新页面
      this.detailMoney="0.0";

    }
  },
  mounted:function () {
    this.reload();
  },
  components:{
    XHeader,
    Group,
    Cell,
    Icon,
    XInput,
    InlineCalendar,
    Picker,
    XButton,
    XProgress,
    Scroller,
    Confirm,
    Toast
  }
}
</script>
<style scoped>

  /* 链接样式 */
  a:-webkit-any-link {
  color:black;
}
/* icon样式 */
  img{
    border-radius:50%;
    border:1px solid lightgreen;
  }

/* 预算总共 */
  .total{
  width:100%;
  height:auto;
}
.total div span{
  display:block;
}

/* 相同属性提取共用css选择器 */
.use,.un-use{
 padding:10px 0 10px 18px;
  display:inline-block;
}
.use{
  width:45%;
}
.un-use{
  width:43%;
  border-left:1px dotted;
}
</style>
