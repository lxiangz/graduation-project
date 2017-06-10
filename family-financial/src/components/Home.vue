<template>
  <div id="hello">
    <flexbox orient="vertical" :gutter="0">
    <flexbox-item>
      <div class="flex-demo upper">
        <flexbox class="flexbox-row">
          <flexbox-item :span="4/12">
            <div>
              <div style="float:left;padding-left:20px;padding-right: 10px;"> <span style="font-size:50px">{{nowDay}}</span></div>
              <div style="float:left;margin-top:16px;font-size:16px;">
                <div><span>{{nowWeek}}</span></div>
                <div>{{nowMonth}}/<span style="">{{nowYear}}</span></div>
              </div>
            </div>
          </flexbox-item>
          <flexbox-item :span="8/12" style="margin-left:0">
            <div style="margin-top:18px;">
              <box v-if="!isLogin" >
                <x-button action-type="button" mini plain type="primary" class="custom-primary-red"  @click.native="login">登陆</x-button>
              </box>
              <div v-if="isLogin">
                <a href="javascript:;" @click="personal">
                  <div style="float: left;padding-top:3px;padding-right:5px;margin-left:80px;">
                    <img width="25px" src="../assets/img/user.png"/>
                  </div>
                  <div style="float: left;">
                    <span>{{name}}</span>
                  </div>
                </a>
              </div>
            </div>
          </flexbox-item>
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
            <span style="color:red">-{{nowDayPay}}</span><br/>
            <span style="color:green">+{{nowDayIncome}}</span>
          </div>
        </cell>
        <cell title="本周" :inline-desc="weekRegion"  is-link @click.native="isNowWeek">
          <img slot="icon" width="40px" style="display:block; margin-right:5px;" :src="weekIconSrc" />
          <div slot="default">
            <span style="color:red">-{{nowWeekPay}}</span><br/>
            <span style="color:green">+{{nowWeekIncome}}</span>
          </div>
        </cell>
        <cell title="本月" :inline-desc="monthRegion"  value="0.00" is-link @click.native="isNowMonth">
          <img slot="icon" width="40px" style="display:block; margin-right:5px;" :src="monthIconSrc" />
          <div slot="default">
            <span style="color:red">-{{nowMonthPay}}</span><br/>
            <span style="color:green">+{{nowMonthIncome}}</span>
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
      todayYearDate:"",
      nowDay:"",//当前日
      nowMonth:"",//当前月
      nowYear:"",//当前年
      nowWeek:"",//当前星期
      name:"",//昵称
      nowMonthIncome:"0.0",//本月收入
      nowMonthPay:"0.0",//本月支出
      budgetBalance:"0.0",//预算余额
      isRecordText:"还没有记过帐",//今天是否记过帐
      nowDayIncome:"0.0",//今天收入
      nowDayPay:"0.0",//今天支出
      weekRegion:"",//这周区间
      weekStart:"",
      weekEnd:"",
      nowWeekIncome:"0.0",//本周收入
      nowWeekPay:"0.0",//本周支出
      monthRegion:"",//这月区间
      monthStart:"",
      monthEnd:"",

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
      if(this.isLogin){
        this.$router.push('/record');
      }else{
        this.toastText="您还未登录，不能记录！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    login(){
     this.$router.push("/login");
    },
    personal(){
      if(this.isLogin){
        this.$router.push('/personal');
      }else{
        this.toastText="您还未登录，不能查看个人信息！";
        this.toastType="warn";
        this.toastShow=true;
      }

    },
    detail(){
      if(this.isLogin){
        this.$router.push('/detail');
      }else{
        this.toastText="您还未登录，不能查看明细！";
        this.toastType="warn";
        this.toastShow=true;
      }

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
        //保存查询条件
        this.$store.commit("saveCheckOptions",{
          checkStartDate:this.nowYear+"-"+this.monthStart,
          checkEndDate:this.nowYear+"-"+this.monthEnd,
          checkMember:this.name,
          checkItem:"收入",
          checkItemDetail:"全部",
        });
        this.$router.push('/checkdetails');
      }else{
        this.toastText="您还未登录，不能查看本月收入！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isNowMonthPay(){
      if(this.isLogin){
        //保存查询条件
        this.$store.commit("saveCheckOptions",{
          checkStartDate:this.nowYear+"-"+this.monthStart,
          checkEndDate:this.nowYear+"-"+this.monthEnd,
          checkMember:this.name,
          checkItem:"支出",
          checkItemDetail:"全部",
        });
        this.$router.push('/checkdetails');
      }else{
        this.toastText="您还未登录，不能查看本月支出！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isBudget(){
      if(this.isLogin){
        this.$router.push('/budget');
      }else{
        this.toastText="您还未登录，不能查看预算！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isNowDay(){
      if(this.isLogin){
        //保存查询条件
        this.$store.commit("saveCheckOptions",{
          checkStartDate:this.todayYearDate,
          checkEndDate:this.todayYearDate,
          checkMember:this.name,
          checkItem:"全部",
          checkItemDetail:"全部",
        });
        this.$router.push('/checkdetails');
      }else{
        this.toastText="您还未登录，不能查看今天账单！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isNowWeek(){
      if(this.isLogin){
        //保存查询条件
        this.$store.commit("saveCheckOptions",{
          checkStartDate:this.nowYear+"-"+this.weekStart,
          checkEndDate:this.nowYear+"-"+this.weekEnd,
          checkMember:this.name,
          checkItem:"全部",
          checkItemDetail:"全部",
        });
        this.$router.push('/checkdetails');
      }else{
        this.toastText="您还未登录，不能查看本周账单！";
        this.toastType="warn";
        this.toastShow=true;
      }
    },
    isNowMonth(){
      if(this.isLogin){
        //保存查询条件
        this.$store.commit("saveCheckOptions",{
          checkStartDate:this.nowYear+"-"+this.monthStart,
          checkEndDate:this.nowYear+"-"+this.monthEnd,
          checkMember:this.name,
          checkItem:"全部",
          checkItemDetail:"全部",
        });
        this.$router.push('/checkdetails');
      }else{
        this.toastText="您还未登录，不能查看本月账单！";
        this.toastType="warn";
        this.toastShow=true;
      }
    }
  },
  mounted:function(){
    this.$router.push("/personal");
    var _this=this;
    //获取登录状态
    this.$instance.get('user/loginState').then(function(response){
      console.log("sss");
      console.log(response);
      console.log(response.data);
      var res=response.data;
      if(response.status==200){
        if(res.code==200){
          //已登陆,获取昵称，获取今天有无记账，获取有无设置预算
          _this.isLogin=true;
          _this.$store.commit("changeLoginState",true);
          //获取信息显示
          _this.$instance.get('home/getHome').then(function(response){
            console.log("sss");
            console.log(response);
            console.log(response.data);
            var res=response.data;
            if(response.status==200){
              if(res.code==200){
                _this.name=res.username;
                _this.nowMonthIncome=res.nowMonthIncome;
                _this.nowMonthPay=res.nowMonthPay;
                _this.budgetBalance=res.budgetBalance;
                _this.nowDayIncome=res.nowDayIncome;
                _this.nowDayPay=res.nowDayPay;
                if(res.recordText){
                  _this.isRecordText="今天已经有记过帐了哦";
                }else{
                  _this.isRecordText="还没有记过帐";
                }

                _this.nowWeekIncome=res.nowWeekIncome;
                _this.nowWeekPay=res.nowWeekPay;
              }else{
              }
            }
          })
            .catch(function(err){
              console.log(err);
            });

        }else{
          //未登录
          _this.isLogin=false;
          _this.$store.commit("changeLoginState",false);
        }
      }
    })
      .catch(function(err){
        console.log(err);
      });

    //获得今天日期显示
    var now = new Date(); //当前日期
    var nowDay = now.getDate(); //当前日
    var nowMonth =(now.getMonth()+1)%12; //当前月
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
    //保存到store中
    this.todayYearDate=nowYear+"-"+todayDate;
    this.$store.commit("setTodayDate",this.todayYearDate);

    //获取本月本周的开始日期、结束日期
    var monthStartDate = new Date(nowYear, now.getMonth(), 1);
    var monthEndDate = new Date(nowYear, nowMonth , 1);
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);//当前月天数
    var weekStartDate=new Date(nowYear,  now.getMonth(), nowDay - nowDayOfWeek).getDate();
    var weekStartMonth=(new Date(nowYear,  now.getMonth(), nowDay - nowDayOfWeek).getMonth()+1)%12;
    var weekEndDate=new Date(nowYear,  now.getMonth(), nowDay + (6 - nowDayOfWeek)).getDate();
    var weekEndMonth=(new Date(nowYear,  now.getMonth(), nowDay + (6 - nowDayOfWeek)).getMonth()+1)%12;
    //周区间显示处理
    if(weekStartDate<10){
      weekStartDate="0"+weekStartDate;
    }
    if(weekStartMonth<10){
      weekStartMonth="0"+weekStartMonth
    }
    if(weekEndDate<10){
      weekEndDate="0"+weekEndDate;
    }
    if(weekEndMonth<10){
      weekEndMonth="0"+weekEndMonth;
    }
    this.weekRegion=weekStartMonth+"月"+weekStartDate+"日-"+weekEndMonth+"月"+weekEndDate+"日"
    this.weekStart=weekStartMonth+"-"+weekStartDate
    this.weekEnd=weekStartMonth+"-"+weekEndDate

    //月区间
    if(nowMonth<10){
      this.monthRegion="0"+nowMonth+"月01日-"+"0"+nowMonth+"月"+days+"日";
      this.monthStart="0"+nowMonth+"-01";
      this.monthEnd="0"+nowMonth+"-"+days
    }else{
      this.monthRegion=nowMonth+"月01日-"+nowMonth+"月"+days+"日";
      this.monthStart=nowMonth+"-01";
      this.monthEnd=nowMonth+"-"+days
    }

    //设置日期图标
    if(nowDay<10){
      this.todayIconSrc=require("../../static/img/0"+nowDay+".png");
    }else{
      this.todayIconSrc=require("../../static/img/"+nowDay+".png");
    }
    this.monthIconSrc=require("../../static/img/month"+nowMonth+".png");
    this.weekIconSrc=require("../../static/img/week"+nowDayOfWeek+".png");
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
  .custom-primary-red {
    margin-left:135px;
    border-radius: 99px!important;
    border-color: #CE3C39!important;
    color: #CE3C39!important;
  &:active {
     border-color: rgba(206, 60, 57, 0.6)!important;
     color: rgba(206, 60, 57, 0.6)!important;
     background-color: transparent;
   }
  }

.flex-demo {
  height:auto;
  background-clip: padding-box;
}
.flexbox-row{
  font-size:18px;
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

  a:-webkit-any-link {
    color:black;
  }
</style>
