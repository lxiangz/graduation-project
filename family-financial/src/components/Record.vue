<template>
  <div id="record">
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="back" >
      <div slot="default" style="padding-top:5px;">
        <button-tab v-model="buttonTabIndex" >
          <button-tab-item @on-item-click="payClick()">支出</button-tab-item>
          <button-tab-item @on-item-click="incomeClick()">收入</button-tab-item>
        </button-tab>
      </div>
      <div slot="right"><icon type="success-no-circle" @click.native="record"></icon></div>
    </x-header>
    <div class="financial">
      <group gutter="0">
        <x-input style="padding:10px 15px" v-model="money" required placeholder="0.00">
          <span style="color:black" slot="label">金额：</span>
        </x-input>
      </group>
      <box v-show="isPay" id="pay-btns" style="padding:0 16px 15px 16px;">
        <x-button  mini plain class="select-btn" id="fruit" @click.native="selected">饮料水果</x-button>
        <x-button  mini plain id="vege" @click.native="selected">买菜原料</x-button>
        <x-button  mini plain id="water" @click.native="selected">水电燃气</x-button>
        <x-button  mini plain id="morning" @click.native="selected">早餐</x-button>
        <x-button  mini plain id="lunch" @click.native="selected">午餐</x-button>
        <x-button  mini plain id="dinner" @click.native="selected">晚餐</x-button>
        <x-button  mini plain id="pay-more" @click.native="selected"  style="min-width:87px">{{paySelectedItem}}</x-button>
        <x-button style="margin-left:39px;"  mini plain  @click.native="payMore" >更多&nbsp;></x-button>
      </box>
      <box v-show="!isPay" id="income-btns" style="padding:0 16px 15px 16px;">
        <x-button  mini plain  id="mon-income" @click.native="selected">工资薪水</x-button>
        <x-button  mini plain id="two-job" @click.native="selected">兼职外快</x-button>
        <x-button  mini plain id="welfare" @click.native="selected">福利补贴</x-button>
        <x-button  mini plain id="gift" @click.native="selected">礼金</x-button>
        <x-button  mini plain id="red-bag" @click.native="selected">红包</x-button>
        <x-button  mini plain id="award" @click.native="selected">奖金</x-button>
        <x-button  mini plain id="income-more" @click.native="selected"  style="min-width:87px">{{incomeSelectedItem}}</x-button>
        <x-button style="margin-left:39px;"  mini plain  @click.native="incomeMore" >更多&nbsp;></x-button>
      </box>
      <group gutter="0">
        <x-input style="padding:5px 15px"  placeholder="..." v-model="remark" :show-clear=false>
          <span style="color:black" slot="label">备注：</span>
          <box slot="right" style="border-left:1px solid;padding-left:10px;">
            <x-icon type="ios-star" size="25"></x-icon>
          </box>
        </x-input>
      </group>
      <box style="padding:0px 16px 12px 16px;">
        <x-button  mini>
          <span slot="default"><icon type="waiting-circle"></icon>{{todayDate}}&nbsp;</span>
        </x-button>
        <x-button  mini>
          <span slot="default"><icon type="info-circle"></icon>现金</span>
        </x-button>
      </box>
    </div>
    <div class="blank">&nbsp;</div>
    <div class="cost">
      <group gutter="0">
        <cell title="这笔钱花给了谁" v-show="isPay" ></cell>
        <cell title="这笔钱谁赚的" v-show="!isPay"></cell>
      </group>
      <div>
        <box class="cost-people" id="pay-box" v-show="isPay">
          <a href="javascript:;"  >
            <div class="little-container select"  >
              <img  id="family-common" @click="selectedMember" src="../assets/img/icon_nav_msg.png" />
              <span>家庭公共</span>
            </div>
          </a>
          <a href="javascript:;" >
            <div class="little-container " >
              <img id="pay-primary" @click="selectedMember" width="56px" src="../assets/logo.png" />
              <span>好奇宝宝</span>
            </div>
          </a>
        </box>
        <box class="cost-people" v-show="!isPay">
          <div class="little-container select " id="income.primary" @click="selectedMember">
            <a >
              <img width="56px" src="../assets/logo.png" />
              <span>好奇宝宝</span>
            </a>
          </div>
        </box>
      </div>
    </div>
  </div>
</template>

<script type="es6">
import { XHeader,ButtonTab, ButtonTabItem,Icon,Group,XInput,XButton,Box,Cell} from 'vux'
export default{
  data(){
    return{
      isLogin:false,
      buttonTabIndex:0,
      isPay:true,
      money:"0.00",//输入金额
      remark:"",//备注
      todayDate:"",//当前日期
      paySelectedItem:"...",
      incomeSelectedItem:"...",
      member:"家庭公共",
      //收入或支出原因
      recordReason:"",
    }
  },
  methods:{
    back(){
      this.$router.push('/home');
    },
    payClick(){
      this.isPay=true;
      var  btns=document.getElementById("pay-btns").getElementsByTagName("button")
      for(var i=0;i<btns.length;i++){
        btns[i].className="weui-btn weui-btn_mini weui-btn_default weui-btn_plain-default ";
      }
      btns[0].className="weui-btn select-btn weui-btn_mini weui-btn_default weui-btn_plain-default";
      this.recordReason="买菜原料"
      var divs=document.getElementById("pay-box").getElementsByTagName("div");
      for(var i=1;i<divs.length;i++){
        divs[i].className="little-container";
      }
      this.member="家庭公共"
    },
    incomeClick(){
      this.isPay=false;
      var  btns=document.getElementById("income-btns").getElementsByTagName("button")
      for(var i=0;i<btns.length;i++){
        btns[i].className="weui-btn weui-btn_mini weui-btn_default weui-btn_plain-default ";
      }
      btns[0].className="weui-btn select-btn weui-btn_mini weui-btn_default weui-btn_plain-default";
      this.recordReason="工资薪水"
      this.member="好奇宝宝"

    },
    payMore(){
      this.$router.push('/paymore')
    },
    incomeMore(){
      this.$router.push('/incomemore')
    },
    selected(e){
      var btns;
      if(this.isPay){
        btns=document.getElementById("pay-btns").getElementsByTagName("button")
      }else{
        btns=document.getElementById("income-btns").getElementsByTagName("button")
      }
      for(var i=0;i<btns.length;i++){
        btns[i].className="weui-btn weui-btn_mini weui-btn_default weui-btn_plain-default ";
      }
     var self=document.getElementById(e.target.id);
      self.className="weui-btn select-btn weui-btn_mini weui-btn_default weui-btn_plain-default ";

      switch(e.target.id){
        case "fruit":{this.recordReason="饮料水果";break;}
        case "vege":{this.recordReason="买菜原料";break;}
        case "water":{this.recordReason="水电燃气";break;}
        case "morning":{this.recordReason="早餐";break;}
        case "lunch":{this.recordReason="午餐";break;}
        case "dinner":{this.recordReason="晚餐";break;}
        case "pay-more":{this.recordReason=this.paySelectedItem;break;}
        case "two-job":{this.recordReason="兼职外快";break;}
        case "welfare":{this.recordReason="福利补贴";break;}
        case "gift":{this.recordReason="礼金";break;}
        case "red-bag":{this.recordReason="红包";break;}
        case "award":{this.recordReason="奖金";break;}
        case "income-more":{this.recordReason=this.incomeSelectedItem;break;}
      }
    },
    selectedMember(e){
      if(this.isPay)
      {
        var divs=document.getElementById("pay-box").getElementsByTagName("div");
        for(var i=0;i<divs.length;i++){
          divs[i].className="little-container";
        }
        var member=document.getElementById(e.target.id);
        member.parentNode.className="little-container select";
        this.member=member.nextSibling.nextSibling.innerHTML;
      }else{
        this.member="好奇宝宝"
      }

    },
    record(){
      var nowYear = new Date().getYear(); //当前年
      nowYear += (nowYear < 2000) ? 1900 : 0;
      console.log(this.money);
      console.log(this.recordReason);
      console.log(this.remark);
      console.log(nowYear+"-"+this.todayDate);
      console.log(this.member);
      if(this.isPay){
        console.log("支出")
      }else{
        console.log("收入")
      }
    }
  },
  components:{
    XHeader,
    ButtonTab,
    ButtonTabItem,
    Icon,
    Group,
    XInput,
    Box,
    XButton,
    Cell
  },
  created:function () {
    this.paySelectedItem=this.$store.state.paySelectedItem;
    this.incomeSelectedItem=this.$store.state.incomeSelectedItem;
  },
  mounted:function () {
    this.paySelectedItem=this.$store.state.paySelectedItem;
    this.incomeSelectedItem=this.$store.state.incomeSelectedItem;
    //this.isPay=this.$store.state.isPay;

    var btns;
    if(this.isPay){
      btns=document.getElementById("pay-btns").getElementsByTagName("button")
    }else{
      btns=document.getElementById("income-btns").getElementsByTagName("button")
    }
    for(var i=0;i<btns.length;i++){
      btns[i].className="weui-btn weui-btn_mini weui-btn_default weui-btn_plain-default ";
    }
    if(this.isPay){
      btns[0].className="weui-btn select-btn weui-btn_mini weui-btn_default weui-btn_plain-default";
      this.recordReason="买菜原料"
    }else{
      btns[0].className="weui-btn select-btn weui-btn_mini weui-btn_default weui-btn_plain-default";
      this.recordReason="工资薪水"
    }

    //今天日期设置
   this.todayDate=this.$store.state.todayDate;
  }
}
</script>

<style scoped>
  #record{
  height:100%;
}
 .blank{
  height:13px;
  background-color:	#DCDCDC;
}
.vux-x-icon {
  fill: #DCDCDC;
}
.cost-people{
  margin:10px 0 0 10px;
}
.cost-people .little-container{
  float:left;
  margin:0 5px;
}
.cost-people .little-container img{
  display:block;
  border-radius:50%;
  border:1px solid #DCDCDC;
}
.cost-people .little-container span{
  font-size:13px;
  color:gray;
  display:block;
}
.cost-people .select span{
  color:green;
}
.cost-people .select img{
  color:green;
   border:1px solid green;
}

.select-btn{
  border-color:green;
  color: green;
}

</style>
