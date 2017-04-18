<template>
  <div class="pay-more">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back" >类别</x-header>
    <div class="pay-menus" id="left">
      <p class="pay-menu"  v-for="(pay,$index) of payMenu" :key="pay.id""><a href="javascript:;" v-on:click="openDetails($index)">{{ pay.text}}</a></p>
    </div>
    <scroller  lock-x>
      <div class="pay-details" id="right">
        <p class="pay-menu" v-for="(paydetails,$index) of payDetails" :key="paydetails.id"><a href="javascript:;" v-on:click="selectDetails($index)">{{paydetails}}</a></p>
      </div>
    </scroller>
  </div>
</template>

<script>
 import {XHeader,Flexbox, FlexboxItem,XButton,Scroller} from 'vux'

const foods=[ '夜宵', '餐饮其他', '零食', '油盐酱醋'];
const traffics=['打车','公交','地铁','加油','停车费','过路过桥','罚款赔偿','保养维修','火车','船舶','自行车','交通其他','车险','驾照费用','长途汽车'];
const shops=['服饰鞋包','家居百货','电子数码','化妆护肤','珠宝首饰','电器','家居家纺','报刊书籍','文具玩具','购物其他','烟酒','宝宝用品','保健用品','摄影文印'];
const plays=['ktv','电影','网游电玩','电视','运动健身','洗浴足浴','茶酒咖啡','旅游度假','歌舞演出','娱乐其他','花鸟宠物','麻将棋牌','聚会玩乐'];
const medical_educations=['医疗用品','培训考试','学杂教材','助学贷款','家教补习','挂号门诊','养生保健','住院费','养老院','学费','幼儿教育','出国留学','医教其他'];
const families=['手机电话','电脑宽带','房款房贷','物业','住宿房租','材料建材','家政服务','快递邮政','生活其他','美发美容','保险费','消费贷款','税费手续费','漏记款','婚庆摄影','生活费'];
const invests=['证券期货','保险','出资','贵金属','投资其他','外汇','收藏品','利息支出','基金','P2P','银行存款','理财产品','余额宝','股票'];
const human_feelings=['礼金红包','物品','慈善捐款','代付款','人情其他','请客','孝敬','给予','养老院'];
const business=['进货采购','人工支出','材料辅料','工程付款','交通运输','运营费','会务费','办公费用','营销广告','店面租金','注册登记','生意其他'];
const pay_details_index=[foods,traffics,shops,plays,medical_educations,families,invests,human_feelings,business];

export default{
  data(){
    return{
      payMenu:[
        {text:'餐饮'},
        {text:'交通'},
        {text:'购物'},
        {text:'娱乐'},
        {text:'医教'},
        {text:'居家'},
        {text:'投资'},
        {text:'人情'},
        {text:'生意'}
      ],
      payDetails:foods
    }
  },
  methods:{
    back(){
      this.$router.push('/record');
      this.$store.commit('changePayPage');
    },
    openDetails($index){
      var pay_menus=document.getElementById('left').getElementsByTagName('p');
      for(var i=0;i<9;i++)
      {
        if(i!=$index)
        {
          pay_menus[i].setAttribute('class','pay-menu');
        }
      }
      pay_menus[$index].setAttribute('class','pay-menu selected');
      this.payDetails=pay_details_index[$index];
      var pay_details=document.getElementById('right').getElementsByTagName('p');
      for(var i=0;i<pay_details.length;i++)
      {
        pay_details[i].setAttribute('class','pay-menu');
      }
     // this.$store.commit('changeSelectedItem',pay_menus[$index]);
      },
    selectDetails($index){
      var pay_details=document.getElementById('right').getElementsByTagName('p');
       /*for(var i=0;i<pay_details.length;i++)
      {
        if(i!=$index)
        {
          pay_details[i].setAttribute('class','pay-menu');
        }
      }
      pay_details[$index].setAttribute('class','pay-menu details_selected');*/
      this.$store.commit('changePaySelected',pay_details[$index].textContent);
      this.$router.push('/record');
    }
  },
  mounted:function () {
    var pay_menus=document.getElementById('left').getElementsByTagName('p');
    pay_menus[0].setAttribute('class','pay-menu selected');
  },
  components:{
    XHeader,
    Flexbox,
    FlexboxItem,
    XButton,
    Scroller
  }
}


</script>

<style>
.pay-menus{
  float:left;
  height:621px;
  width:25%;
  background-color:	#DCDCDC;
}
a:-webkit-any-link {
  color:black;
}
.pay-menu{
  border-bottom:1px solid #DCDCDC;
  padding:10px 0 10px 15px;
  color:	black;
  font-size:16px;
}
.selected{
  background-color:white;
}
.pay-details{
  float:left;
  width:100%;
}
.details_selected{
  background-color:	#F5F5F5;
}
</style>
