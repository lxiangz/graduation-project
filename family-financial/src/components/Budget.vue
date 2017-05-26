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
      <x-input :title="payItemText" v-model="detailMoney" placeholder="请输入金额" show-clear>
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
        <span style="font-size:18px;">当前修改的是xx预算:xxxx<br>是否修改为xxxx?</span>
      </div>
    </confirm>
    <picker v-if="isShow" v-model="payItem" :data="payItems" @on-change="payItemChange"></picker>

    <group gutter="0" style="width:100%;border-top:15px solid #DCDCDC">
      <cell  title="详细预算:"  style="font-weight:bold;color:darkgreen;font-size: larger" ></cell>
      <scroller lock-x height="-380">
        <cell  is-link>
          <img slot="icon" width="45px" src="../assets/vux_logo.png" />
          <div slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">餐饮</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">0.00</span>
            <x-progress :percent="foodPercent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 0.00</span>
          </div>
        </cell>
        <cell  is-link>
          <img slot="icon" width="45px" src="../assets/vux_logo.png" />
          <div slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">交通</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">50.00</span>
            <x-progress :percent="trafficPercent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 100.00</span>
          </div>
        </cell>
        <cell  is-link>
          <img slot="icon" width="45px" src="../assets/vux_logo.png" />
          <div slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">购物</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">50.00</span>
            <x-progress :percent="shopPercent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 200.00</span>
          </div>
        </cell>
        <cell  is-link>
          <img slot="icon" width="45px" src="../assets/vux_logo.png" />
          <div slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">医教</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">50.00</span>
            <x-progress :percent="mediEduPercent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 500.00</span>
          </div>
        </cell>
        <cell  is-link>
          <img slot="icon" width="45px" src="../assets/vux_logo.png" />
          <div slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">居家</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">-50</span>
            <x-progress :percent="homePercent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 500.00</span>
          </div>
        </cell>
        <cell  is-link>
          <img slot="icon" width="45px" src="../assets/vux_logo.png" />
          <div slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">投资</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">0.00</span>
            <x-progress :percent="investPercent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 0.00</span>
          </div>
        </cell>
        <cell  is-link>
          <img slot="icon" width="45px" src="../assets/vux_logo.png" />
          <div slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">人情</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">0.00</span>
            <x-progress :percent="feelsPercent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 0.00</span>
          </div>
        </cell>
        <cell  is-link>
          <img slot="icon" width="45px" src="../assets/vux_logo.png" />
          <div slot="after-title" style="margin-left:5px;height:50px;">
            <span style="margin-right:100px;">生意</span>
            <span style="color:grey;font-size:15px;">余额</span>
            <span style="font-size:15px;">0.00</span>
            <x-progress :percent="businessPercent" :show-cancel="false"></x-progress>
            <span style="color:grey;font-size:15px;">预算 0.00</span>
          </div>
        </cell>
      </scroller>
    </group>

    </div>
</template>
<script type="es6">
import {XHeader,Group,Cell,Icon,XInput,InlineCalendar,Picker,XButton,XProgress,Scroller,Confirm} from 'vux'
const payItems=['餐饮', '交通', '购物', '娱乐', '医教', '居家', '投资', '人情', '生意'];
export default{
  data(){
    return{
      currentDate:"",//当前选中日期，默认为空，即选中当天日期
      budgets:"0.00",
      use:"0.00",
     unUse:"0.00",
      detailMoney:"",
      isSaveShow:false,
      isShow:false,
      payItem:[""],
      payItems:[['餐饮', '交通', '购物', '娱乐', '医教', '居家', '投资', '人情', '生意']],
      payItemText:"餐饮金额：",
      foodPercent:0,
      trafficPercent:50,
      shopPercent:25,
      mediEduPercent:10,
      homePercent:0,
      investPercent:0,
      feelsPercent:34,
      businessPercent:67,


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
      console.log(this.payItem[0]);
      console.log("ddd");
      this.payItemText=this.payItem[0]+"金额："
    },
    save(){
      this.isSaveShow=true;
    },
    onCancel(){
      this.isSaveShow=false;
    }
  },
  mounted:function () {
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
