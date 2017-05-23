<template>
  <div id="hello">
    <flexbox orient="vertical" :gutter="0">
    <flexbox-item>
      <div class="flex-demo upper">
        <flexbox class="flexbox-row">
          <flexbox-item :span="2/12"></flexbox-item>
          <flexbox-item :span="10/12" v-if="!isLogin">
            <div >
              <img  width="25px" src="../assets/img/remind.png"/>
              <span v-if="!isLogin" style="">欢迎您，请先<a  href="javascript:;" @click="login" >登录</a></span>
              <span v-if="isLogin">欢迎您，{{name}}</span>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox class="flexbox-row">
          <img width="25px" src="../assets/img/date.png"/>
          <flexbox-item :span="6/12"><div>{{nowYear}}/<span style="">{{nowMonth}}</span>/{{nowDay}} {{nowWeek}}</div></flexbox-item>
        </flexbox>
        <group gutter="0" style="" >
          <cell title="本月收入" :value="nowMonthIncome"is-link @click.native="isNowMonthIncome"></cell>
          <cell title="本月支出" :value="nowMonthPay" is-link @click.native="isNowMonthPay" ></cell>
          <cell title="预算余额" :value="budgetBalance"  is-link  @click.native="isBudget" ></cell>
        </group>
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo record ">
        <box gap="1px 20px">
          <x-button type="primary" action-type="button" @click.native="list">记一笔</x-button>
        </box>
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <group gutter="0">
        <cell title="今天" :inline-desc="isRecordText"  is-link @click.native="isNowDay" >
          <img slot="icon" width="40px" style="display:block; margin-right:5px;" :src="todayIconSrc" />
          <div slot="default">
            <span style="color:red">{{nowDayIncome}}</span><br/>
            <span style="color:green">{{nowDayPay}}</span>
          </div>
        </cell>
        <cell title="本周" :inline-desc="weekRegion"  is-link @click.native="isNowWeek">
          <img slot="icon" width="40px" style="display:block; margin-right:5px;" :src="weekIconSrc" />
          <div slot="default">
            <span style="color:red">{{nowWeekIncome}}</span><br/>
            <span style="color:green">{{nowWeekPay}}</span>
          </div>
        </cell>
        <cell title="本月" :inline-desc="monthRegion"  value="0.00" is-link @click.native="isNowMonth">
          <img slot="icon" width="40px" style="display:block; margin-right:5px;" :src="monthIconSrc" />
          <div slot="default">
            <span style="color:red">{{nowMonthIncome}}</span><br/>
            <span style="color:green">{{nowMonthPay}}</span>
          </div>
        </cell>
        <cell title="社区" inline-desc="跟大神一起学记账"  is-link @click.native="sociation">
          <img slot="icon" width="40px" style="display:block; margin-right:5px;" src="../../static/img/soc.png" />
          <div slot="default">
            <span style="color:orange">福利活动</span>
          </div>
        </cell>
        </group>
      </div>
    </flexbox-item>
    </flexbox>
    <tabbar>
      <tabbar-item selected >
        <img slot="icon" width="64px" src="../../static/img/home.png">
          <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item  @click.native="detail">
        <img slot="icon" src="../../static/img/detail.png">
          <span slot="label">明细</span>
      </tabbar-item>
      <tabbar-item  @click.native="table" >
        <img slot="icon" width="64px" src="../../static/img/table.png">
          <span slot="label">报表</span>
      </tabbar-item>
      <tabbar-item   @click.native="personal" >
        <img slot="icon" src="../../static/img/personal.png">
          <span slot="label">账户</span>
      </tabbar-item>
      <tabbar-item  @click.native="money">
        <img slot="icon" src="../../static/img/mana-mon.jpg">
          <span slot="label">理财</span>
      </tabbar-item>
    </tabbar>

    <!--显示警告信息-->
    <toast v-model="toastShow" width="11em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
  </div>
</template>

<script type="es6">
import { Flexbox, FlexboxItem,Cell,Group,XButton,Box,Tabbar, TabbarItem,Badge,Toast} from 'vux'
export default {
  data(){
    return{
      isLogin:false,//是否登录
      nowDay:"",//当前日
      nowMonth:"",//当前月
      nowYear:"",//当前年
      nowWeek:"",//当前星期
      name:"",//昵称
      nowMonthIncome:"0.00",//本月收入
      nowMonthPay:"0.00",//本月支出
      budgetBalance:"",//预算余额
      isRecordText:"还没有记过帐",//今天是否记过帐
      nowDayIncome:"0.00",//今天收入
      nowDayPay:"0.00",//今天支出
      weekRegion:"",//这周区间
      nowWeekIncome:"0.00",//本周收入
      nowWeekPay:"0.00",//本周支出
      monthRegion:"",//这月区间

      //当前天图标链接
      todayIconSrc:"",
      //当前月图标链接
      monthIconSrc:"",
      //当前星期几图标
      weekIconSrc:"",
      //提示弹框属性
      toastShow:false,
      toastType:"warn",
      toastText:"",
    }
  },
  methods:{
    list(){
       this.$router.push('/record');
    },
    login(){
     this.$router.push("/login");
    },
    personal(){
      this.$router.push('/personal');
    },
    detail(){
        this.$router.push('/detail');
    },
    table(){
      this.$router.push('/table');
    },
    money(){
      this.$router.push('/money');
    },
    //权限设置
    isNowMonthIncome(){
      if(this.isLogin){
        this.$router.push('/record');
      }else{
        this.toastText="您还未登录，不能查看本月收入！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isNowMonthPay(){
      if(this.isLogin){
        this.$router.push('/record');
      }else{
        this.toastText="您还未登录，不能查看本月支出！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isBudget(){
      if(this.isLogin){
        this.$router.push('/record');
      }else{
        this.toastText="您还未登录，不能查看预算！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isNowDay(){
      if(this.isLogin){
        this.$router.push('/record');
      }else{
        this.toastText="您还未登录，不能查看今天账单！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isNowWeek(){
      if(this.isLogin){
        this.$router.push('/record');
      }else{
        this.toastText="您还未登录，不能查看本周账单！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isNowMonth(){
      if(this.isLogin){
        this.$router.push('/record');
      }else{
        this.toastText="您还未登录，不能查看本月账单！";
        this.toastType="warn";
        this.toastShow=true;
      }
    }
  },
  mounted:function(){
    //获取登录状态
    this.$instance.get('loginState').then(function(response){
      console.log("sss");
      console.log(response);
      console.log(response.data);
      var res=response.data;
      if(response.status==200){
        if(res.code==200){
          //已登陆,获取昵称，获取今天有无记账，获取有无设置预算
          this.isLogin=true;
          this.$store.commit("changeLoginState",true);
        }else{
          //未登录
          this.isLogin=false;
          this.$store.commit("changeLoginState",false);
        }
      }
    })
      .catch(function(err){
        console.log(err);
      });

    //获得今天日期显示
    var now = new Date(); //当前日期
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth()+1; //当前月
    var nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    switch(nowDayOfWeek )
    {
      case 0: this.nowWeek = "星期日";break;
      case 1: this.nowWeek = "星期一";break;
      case 2: this.nowWeek = "星期二";break;
      case 3: this.nowWeek= "星期三";break;
      case 4: this.nowWeek = "星期四";break;
      case 5: this.nowWeek = "星期五";break;
      case 6: this.nowWeek= "星期六";break;
    }
    this.nowDay=nowDay;
    this.nowMonth=nowMonth;
    this.nowYear=nowYear;

    //保存当前日期
    var todayDate;
    if(nowMonth<10&nowDay<10){
      todayDate="0"+nowMonth+"-0"+nowDay;
    }else if(nowMonth>10&nowDay<10){
      todayDate=nowMonth+"-0"+nowDay;
    }else if(nowMonth>10&nowDay>10){
      todayDate=nowMonth+"-"+nowDay;
    }else{
      todayDate="0"+nowMonth+"-"+nowDay;
    }
    this.$store.commit("setTodayDate",todayDate);


    //获取本月本周的开始日期、结束日期
    var monthStartDate = new Date(nowYear, nowMonth-1, 1);
    var monthEndDate = new Date(nowYear, nowMonth , 1);
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);//当前月天数
    var weekStartDate=new Date(nowYear, nowMonth-1, nowDay - nowDayOfWeek).getDate();
    var weekEndDate=new Date(nowYear, nowMonth-1, nowDay + (6 - nowDayOfWeek)).getDate();
    //显示处理
    if(weekStartDate<10||weekEndDate<10){
      weekStartDate="0"+weekStartDate;
      weekEndDate="0"+weekEndDate;
    }
    if(nowMonth<10){
      this.monthRegion="0"+nowMonth+"月01日-"+"0"+nowMonth+"月"+days+"日";
     if(weekStartDate<weekEndDate){
       this.weekRegion="0"+nowMonth+"月"+weekStartDate+"日-"+"0"+nowMonth+"月"+weekEndDate+"日"
     }else{
       this.weekRegion="0"+nowMonth+"月"+weekStartDate+"日-"+"0"+(nowMonth+1).toString+"月"+weekEndDate+"日"
     }
    }else{
      this.monthRegion=nowMonth+"月01日-"+"0"+nowMonth+"月"+days+"日";
    }

    //设置日期图标
    if(nowDay<10){
      this.todayIconSrc="../../static/img/0"+nowDay+".png";
    }else{
      this.todayIconSrc="../../static/img/"+nowDay+".png";
    }
    this.monthIconSrc="../../static/img/month"+nowMonth+".png";
    this.weekIconSrc="../../static/img/week"+nowDayOfWeek+".png";
  },
  components: {
    Flexbox,
    FlexboxItem,
    Cell,
    Group,
    XButton,
    Box,
    Tabbar,
    TabbarItem,
    Badge,
    Toast
  }
}
</script>

<style scoped>
  .weui-cell{
  padding:10px 30px;
}
.upper{
  /* padding-bottom:20px;
 background-image:url("../assets/img/green_bg.jpg")*/

}
.flex-demo {
  height:auto;
  background-clip: padding-box;
}
.flexbox-row{
  font-size:18px;
padding:2px 20px;
}
.record{
  padding:10px 0;
}
#primary{
/*
animation:right 1s;
 animation-fill-mode: forwards;*/

 position:absolute;
 top:0px;
 height:100%;
 width:100%;
  z-index:5;
}
#primary div{
 float:left;
}
#primary #left{
  background-color:white;
  position: absolute;
  left:-375px;
 width:70%;
 height:92%;
}
#primary #right{
  position: absolute;
 left:261px;
width:30%;
 height:92%;
  background-color: white;
  opacity: 0.8;
  display: none;
}
/* div左右滑动动画 */
/* 右滑 */
@keyframes right
{
from {left:-375px;}
to {left:0px;}
}
/* 左滑 */
@keyframes left
{
from {left:0px;}
to {left:-375px;}
}
</style>
