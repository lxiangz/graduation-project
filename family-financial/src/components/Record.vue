<template>
  <div id="record">
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="back" >
      <div slot="default" style="padding-top:5px;">
        <button-tab  >
          <button-tab-item  :selected="isPay"  @on-item-click="payClick()">支出</button-tab-item>
          <button-tab-item :selected="!isPay"  @on-item-click="incomeClick()">收入</button-tab-item>
        </button-tab>
      </div>
      <div slot="right"><icon type="success-no-circle" @click.native="record"></icon></div>
    </x-header>
    <div class="financial">
      <group gutter="0">
        <x-input style="padding:10px 15px" v-model="money" required placeholder="精确到小数点后一位">
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
        <x-button  mini @click.native="selectDate">
          <span slot="default"><icon type="waiting-circle"></icon>{{selectedDate}}&nbsp;</span>
        </x-button>
        <x-button  mini>
          <span slot="default"><icon type="info-circle"></icon>现金</span>
        </x-button>
      </box>
      <inline-calendar
        v-if="showDate"
        v-model="selectedDate"
        disable-future
        >
      </inline-calendar>
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
              <span>{{name}}</span>
            </div>
          </a>
        </box>
        <box class="cost-people" v-show="!isPay">
          <div class="little-container select " id="income-primary" @click="selectedMember">
            <a >
              <img width="56px" src="../assets/logo.png" />
              <span>{{name}}</span>
            </a>
          </div>
        </box>
      </div>
    </div>
    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
  </div>
</template>

<script type="es6">
import { XHeader,ButtonTab, ButtonTabItem,Icon,Group,XInput,XButton,Box,Cell,InlineCalendar,Toast} from 'vux'
export default{
  data(){
    return{
      isLogin:false,
      current:"record",
      isPay:true,
      money:"0.0",//输入金额
      remark:"",//备注
      showDate:false,//是否显示选择时间组件
      selectedDate:"",//选中日期
      paySelectedItem:"...",
      incomeSelectedItem:"...",
      member:"家庭公共",
      name:"好奇宝宝",//昵称
      type:"",//支出或收入
      //收入或支出原因
      recordReason:"",

      //警告信息
      toastShow:false,
      toastType:"warn",
      toastText:"",
    }
  },
  methods:{
    back(){
     this.$store.commit("changeRecordState",true)
      this.$router.push('/home');
    },
    //支出页面初始化
     payInit(){
       var  btns=document.getElementById("pay-btns").getElementsByTagName("button")
       for(var i=0;i<btns.length;i++){
         btns[i].className="weui-btn weui-btn_mini weui-btn_default weui-btn_plain-default ";
       }
       btns[0].className="weui-btn select-btn weui-btn_mini weui-btn_default weui-btn_plain-default";
       this.recordReason="饮料水果"
       var divs=document.getElementById("pay-box").getElementsByTagName("div");
       for(var i=1;i<divs.length;i++){
         divs[i].className="little-container";
       }
       this.member="家庭公共"
     },
    //收入页面初始化
    incomeInit(){
      var  btns=document.getElementById("income-btns").getElementsByTagName("button")
      for(var i=0;i<btns.length;i++){
        btns[i].className="weui-btn weui-btn_mini weui-btn_default weui-btn_plain-default ";
      }
      btns[0].className="weui-btn select-btn weui-btn_mini weui-btn_default weui-btn_plain-default";
      this.recordReason="工资薪水"
      this.member=this.name
    },
    payClick(){
      this.isPay=true;
      this.$store.commit("changeRecordState",true);
      this.payInit();
    },
    incomeClick(){
      this.isPay=false;
      this.$store.commit("changeRecordState",false);
     this.incomeInit();

    },
    payMore(){
      this.$store.commit("saveRecordData",{
        money:this.money,
        remark:this.remark,
        selectedDate:this.selectedDate
      });
      this.$store.commit("changePage","record");
      this.$router.push('/paymore')
    },
    incomeMore(){
      this.$store.commit("saveRecordData",{
        money:this.money,
        remark:this.remark,
        selectedDate:this.selectedDate
      });
      this.$store.commit("changePage","record");
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
        case "mon-income":{this.recordReason="工资薪水";break;}
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
        this.member=this.name
      }

    },
    selectDate(){
      if(this.showDate){
        this.showDate=false;
      }else{
        this.showDate=true;
      }
    },
    record(){
      var _this=this;
      console.log(this.money);
      console.log(this.recordReason);
      console.log(this.remark);
      console.log(this.selectedDate);
      console.log(this.member);
      if(this.isPay){
        this.type="支出";
        console.log("支出")
      }else{
        this.type="收入";
        console.log("收入")
      }
     var num =/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,1})?$/;
      var re = new RegExp(num);
      if(this.money==""){
        this.toastShow=true;
        this.toastType="warn";
        this.toastText="金额不能为空";
      }else if(this.money<=0){
        this.toastShow=true;
        this.toastType="warn";
        this.toastText="金额不能小于等于0";
      }else if(re.test(this.money)){
        //记账
        this.$instance.post('bill/addBill',{
          num:_this.money,
          member:_this.member,
          typeName:_this.recordReason,
          remake:_this.remark,
          time:_this.selectedDate,
          type:_this.type,
        }).then(function(response){
          if(response.status==200){
            var res=response.data;
            if(res.code===200){
              console.log("sss");
              _this.toastShow=true;
              _this.toastType="default";
              _this.toastText="记账成功";
              _this.money="0.0";
            }else if(res.code===404){

            }
          }
        })
          .catch(function(err){
            console.log(err);
          });
      }else {
        this.toastShow=true;
        this.toastType="warn";
        this.toastText="金额格式错误";
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
    Cell,
    InlineCalendar,
    Toast
  },
  mounted:function () {
    //状态
    this.paySelectedItem=this.$store.state.paySelectedItem;
    this.incomeSelectedItem=this.$store.state.incomeSelectedItem;
    this.isPay=this.$store.state.isPay;
    this.money=this.$store.state.money;
    this.remark=this.$store.state.remark;
    //获取日期
    if(this.$store.state.selectedDate==""){
      this.selectedDate=this.$store.state.todayDate;
    }else{
      this.selectedDate=this.$store.state.selectedDate;
    }
    //初始化
    if(this.isPay){
      this.payInit();
    }else{
      this.incomeInit();
    }

    //获取昵称
    var _this=this;
    this.$instance.get('user/getUser').then(function(response){
      if(response.status==200){
        var res=response.data;
        if(res.code===200){
          console.log("sss");
          _this.name=res.user.username;
        }else if(res.code===400){
          console.log(res.message);
        }
      }
    })
      .catch(function(err){
        console.log(err);
      });
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
