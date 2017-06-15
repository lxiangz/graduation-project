<template>
  <div class="budget">
    <x-header :left-options="{backText: '设置预算',preventGoBack:true}"  @on-click-back="back"></x-header>
    <group gutter="0" >
      <calendar title="选择月份" v-model="currentDate" @on-change="monthChange"></calendar>
    </group>
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
    <div id="setBudget">
      <group gutter="0" style="width:100%;border-top:15px solid #DCDCDC;">
        <cell  title="管理详细预算:" style="font-weight:bold;color:darkgreen; font-size: larger" >
          <div slot="default"><icon type="success-no-circle" @click.native="save"></icon></div>
        </cell>
        <x-input :title="payItemText" v-model="detailMoney" placeholder="请输入金额" :show-clear="false" >
          <div slot="right">
            <x-button  type="primary" style="height:35px;border-radius:99px;font-size:15px;" action-type="button" @click.native="selectPay" >选择支出项</x-button>
          </div>
        </x-input>
      </group>
    </div>


    <confirm v-model="isSaveShow"
             title=""
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
            >
      <div slot="default">
        <icon type="safe_warn" is-msg></icon><br><br>
        <span style="font-size:18px;">当前修改的是{{changeItem}}预算<br>是否修改为{{detailMoney}}?</span>
      </div>
    </confirm>
    <picker v-if="isShow" v-model="payItem" :data="payItems" @on-change="payItemChange"></picker>

    <group gutter="0" style="width:100%;border-top:15px solid #DCDCDC">
      <cell  title="详细预算:"  style="font-weight:bold;color:darkgreen;font-size: larger" ></cell>
      <div class="budget-detail" id="details" >
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
      </div>
    </group>
    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>


    </div>
</template>
<script type="es6">
import {XHeader,Group,Cell,Icon,XInput,InlineCalendar,Picker,XButton,XProgress,Confirm,Toast,Calendar} from 'vux'
const payItems=['餐饮', '交通', '购物', '娱乐', '医教', '居家', '投资', '人情', '生意'];
export default{
  data(){
    return{
      currentDate:"",//当前选中日期，默认为空，即选中当天日期
      budgets:"0.0",//总预算
      use:"0.0",//已用
     unUse:"0.0",//未用
      detailMoney:"0.0",//输入金额
      isSaveShow:false,//修改确认框是否显示
      isShow:false,//预算项选择框是否显示
      payItem:["餐饮"],//当前选择的某一预算项
      payItems:[['餐饮', '交通', '购物', '娱乐', '医教', '居家', '投资', '人情', '生意']],//修改预时可选择的全部预算项
      payItemText:"餐饮金额：",
      //每一项预算百分比、余额、预算，数据结构
      budgetDetail:[
        {name:"餐饮",budget: "0.0",percent:0,balance: "0",img:"../../static/img/food.png"},{name:"交通",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/traffic.png"},
        {name:"购物",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/shop.png"}, {name:"娱乐",budget: "0.0",percent:0,balance: "0",img:"../../static/img/play.png"},
        {name:"医教",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/hospital.png"}, {name:"居家",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/home.png"},
        {name:"投资",budget: "0.0",percent:0,balance: "0",img:"../../static/img/mana-mon.png"},{name:"人情",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/favor.png"},
        {name:"生意",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/business.jpg"},
      ],

      //提示信息框设置
      toastText:"",
      toastShow:false,
      toastType:"warn",

      //修改信息确认
      changeItem:"餐饮",

    }
  },
  methods:{
    back(){
      this.$router.push("/home");
    },
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
    monthChange(){
      var month=new Date(this.currentDate);
      var currentMonth=new Date(this.$store.state.todayDate);
     if(month<currentMonth){
       document.getElementById("setBudget").style.display="none";
       document.getElementById("details").className="budget-detail-hide";
     }else{
       document.getElementById("setBudget").style.display="block";
       document.getElementById("details").className="budget-detail";
     }

      this.reload();
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
      var month=new Date(this.currentDate).getMonth()+1;
      var year = new Date(this.currentDate).getYear(); //当前年
      year += (year < 2000) ? 1900 : 0;
      var _this=this;
      //执行请求，修改预算，
     this.$instance.post('budget/addBudget',{
        num:_this.detailMoney,
        month:month,
       year:year,
        typeName:_this.payItem[0],
      }).then(function(response){
        if(response.status==200){
          var res=response.data;
          if(res.code===200){
            _this.toastShow=true;
            _this.toastType="default";
            _this.toastText="设置成功";
            _this.reload();//刷新页面数据
          }else if(res.code===404){}
          _this.toastShow=true;
          _this.toastType="warn";
          _this.toastText=res.message;
        }
      })
        .catch(function(err){
          console.log(err);
        });
      this.isSaveShow=false;//修改确认框关掉
    },
    //重新加载方法，同步更新显示数据
    reload(month){
      var _this=this;
      var month=new Date(this.currentDate).getMonth()+1;
      var year = new Date(this.currentDate).getYear(); //当前年
      year += (year < 2000) ? 1900 : 0;
      this.$instance.post('budget/getBudgets',{  //获取请求数据，更新页面
        month:month, year:year
      }).then(function(response){
        if(response.status==200){
          var res=response.data;
          if(res.code===200){
            _this.budgets=res.budgets;
            _this.use=res.use;
            _this.unUse=res.unUse;
            if(res.budgetDetails.length>0){
              _this.budgetDetail=res.budgetDetails;//存在详细预算，直接设置
            }else{
              _this.budgetDetail=[//不存在，显示全为0.0
                {name:"餐饮",budget: "0.0",percent:0,balance: "0",img:"../../static/img/food.png"},{name:"交通",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/traffic.png"},{name:"购物",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/shop.png"},
                {name:"娱乐",budget: "0.0",percent:0,balance: "0",img:"../../static/img/play.png"}, {name:"医教",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/hospital.png"},{name:"居家",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/home.png"},
                {name:"投资",budget: "0.0",percent:0,balance: "0",img:"../../static/img/mana-mon.png"},{name:"人情",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/favor.png"},{name:"生意",budget: "0.0",percent:0,balance: "0.0",img:"../../static/img/business.jpg"},
              ];
            }
          }else if(res.code===404){
          }
        }
      })
        .catch(function(err){
          console.log(err);
        });
      this.detailMoney="0.0";

    }
  },
  mounted:function () {
    var _this=this;
    this.currentDate=this.$store.state.todayDate;
    this.reload();
    plus.key.removeEventListener("backbutton",function(){
      console.log("remove");
    });
    plus.key.addEventListener("backbutton",function(){
      _this.back();
    });
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
    Confirm,
    Toast,
    Calendar
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


  /*滚动div样式设置*/
  .budget-detail{
    height:210px;
    overflow-y: auto;
  }
  .budget-detail-hide{
    height:320px;
    overflow-y: auto;
  }
</style>
