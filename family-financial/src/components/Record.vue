<template>
  <div id="record">
    <x-header >
      <div slot="default" style="padding-top:5px;">
        <button-tab v-model="buttonTabIndex" >
          <button-tab-item @on-item-click="payClick()">支出</button-tab-item>
          <button-tab-item @on-item-click="incomeClick()">收入</button-tab-item>
        </button-tab>
      </div>
      <div slot="right"><icon type="success-no-circle"></icon></div>
    </x-header>
    <div class="financial">
      <group gutter="0">
        <x-input style="padding:10px 15px" required="true" placeholder="0.00">
          <span style="color:black" slot="label">金额：</span>
        </x-input>
      </group>
      <box style="padding:0 16px 15px 16px;">
        <x-button  mini plain type="primary">饮料水果</x-button>
        <x-button  mini plain type="primary">买菜原料</x-button>
        <x-button  mini plain type="primary">水电燃气</x-button>
        <x-button  mini plain type="primary">早餐</x-button>
        <x-button  mini plain type="primary">午餐</x-button>
        <x-button  mini plain type="primary">晚餐</x-button>
        <x-button  mini plain type="primary">物业费</x-button>
        <x-button  mini plain type="primary">...</x-button>
        <x-button  mini plain type="primary">更多&nbsp;></x-button>
      </box>
      <group gutter="0">
        <x-input style="padding:5px 15px" required="true" placeholder="...">
          <span style="color:black" slot="label">备注：</span>
          <box slot="right" style="border-left:1px solid;padding-left:10px;">
            <x-icon type="ios-search-strong" size="25"></x-icon>
            <x-icon type="ios-star" size="25"></x-icon>
          </box>
        </x-input>
      </group>
      <box style="padding:0px 16px 12px 16px;">
        <x-button  mini>
          <span slot="default"><icon type="waiting-circle"></icon>04-13&nbsp;15:22</span>
        </x-button>
        <x-button  mini>
          <span slot="default"><icon type="info-circle"></icon>现金</span>
        </x-button>
      </box>
    </div>
    <div class="blank">&nbsp;</div>
    <div class="cost">
      <group gutter="0">
        <cell title="这笔钱花给了谁" value="新增" is-link></cell>
      </group>
      <div>
        <box class="cost-people">
          <div class="little-container">
            <a>
              <img  src="../assets/img/icon_nav_msg.png" />
              <span>家庭公共</span>
            </a>
          </div>
          <div class="little-container select">
            <a>
              <img width="56px" src="../assets/logo.png" />
              <span>好奇宝宝</span>
            </a>
          </div>
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader,ButtonTab, ButtonTabItem,Icon,Group,XInput,XButton,Box,Cell} from 'vux'

export default{
  data(){
    return{
      buttonTabIndex:0
    }
  },
  methods:{

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
  }
}
</script>

<style>
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



</style>
