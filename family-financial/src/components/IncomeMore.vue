<template>
  <div class="income-more">
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="back" >类别</x-header>
      <div style="height:572px;overflow-y: auto;">
        <p style="border-bottom:1px solid #DCDCDC;padding:10px 0 10px 15px;color:	#696969;font-size:14px;" v-for="(income,$index) of incomeTable" :key="income.id"><a href="javascript:;" v-on:click="selectDetails($index)">{{income}}</a></p>
      </div>
  </div>
</template>

<script type="es6">
import {XHeader} from 'vux'
export default{
  data(){
    return{
      incomeTable:['股票', '基金', '分红', '利息', '租金', '应收款', '销售款', '报销款', '漏记款',
        '生活费', '公积金', '退款返款', '赔付款', '余额宝', '营业收入', '工程款', '其他'
      ]

    }
  },
  methods:{
    back(){
      if(this.$store.state.page=="record"){
        this.$router.push('/record');
      }
      if(this.$store.state.page=="detail"){
        this.$router.push('/detail');
      }
     // this.$store.commit('changeIncomePage');//改变record页面的状态为填写收入
    },
     selectDetails($index){
       if(this.$store.state.page=="record"){
         this.$store.commit('changeIncomeSelected',this.incomeTable[$index]);//将选择收入方式的结果存储
         this.$router.push('/record');
       }
       if(this.$store.state.page=="detail"){
         this.$store.commit('changeDetailSelected',this.incomeTable[$index]);//将选择收入方式的结果存储
         this.$router.push('/detail');
       }
     }
  },
  components:{
    XHeader
  },
  mounted:function(){
    if(this.$store.state.page=="record"){
      this.incomeTable=['股票', '基金', '分红', '利息', '租金', '应收款', '销售款', '报销款', '漏记款', '生活费',
        '公积金', '退款返款', '赔付款', '余额宝', '营业收入', '工程款', '其他'//record页面时显示部分数据，不显示记账页面已有的收入像
      ]
    }
    if(this.$store.state.page=="detail"){//detail页面时显示全部数据，增加全部一项
      this.incomeTable=['全部', '工资薪水', '兼职外快', '福利补贴', '礼金', '红包', '奖金', '股票', '基金', '分红', '利息', '租金',
        '应收款', '销售款', '报销款', '漏记款', '生活费', '公积金', '退款返款', '赔付款', '余额宝', '营业收入', '工程款', '其他'
      ]
    }
    var _this=this;
    plus.key.addEventListener("backbutton",function(){
      _this.back();
    });
  }
}
</script>

 <style scoped>
   a:-webkit-any-link {
   color:black;
}
 </style>
