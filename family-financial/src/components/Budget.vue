<template>
  <div class="budget">
    <x-header :left-options="{backText: ''}">
      <div slot="default" class="select" v-on:click="show">
        <span>{{selectedTime}}</span>
        <img src="../assets/img/arrow.png" width="20px" />
      </div>
    </x-header>
    <div :class="{ 'select-option is-show': isShow, 'select-option is-not-show': !isShow}">
      <group gutter="0">
        <cell @click.native="selectT">
          <span slot="icon">今天</span>
          <icon  slot="default"   :class="{ 'is-show': isTShow, 'is-not-show': !isTShow}" type="success-no-circle"></icon>
        </cell>
        <cell @click.native="selectW">
          <span slot="icon">本周</span>
          <icon  slot="default"   :class="{ 'is-show': isWShow, 'is-not-show': !isWShow}" type="success-no-circle"></icon>
        </cell>
        <cell @click.native="selectM">
          <span slot="icon">本月</span>
          <icon  slot="default"   :class="{ 'is-show': isMShow, 'is-not-show': !isMShow}" type="success-no-circle"></icon>
        </cell>
        <cell @click.native="selectQ">
          <span slot="icon">本季</span>
          <icon  slot="default"   :class="{ 'is-show': isQShow, 'is-not-show': !isQShow}" type="success-no-circle"></icon>
        </cell>
        <cell @click.native="selectY">
          <span slot="icon">本年</span>
          <icon  slot="default"   :class="{ 'is-show': isYShow, 'is-not-show': !isYShow}" type="success-no-circle"></icon>
        </cell>
      </group>
    </div>
    <div class="total">
      <group gutter="0" style="width:100%">
        <x-input style="padding:15px; " required placeholder="0.00">
          <span style="color:black" slot="label">总预算：</span>
        </x-input>
      </group>
      <div class="use">
        <span>0.00</span>
        <span>已用</span>
      </div>
      <div class="un-use">
        <span>0.00</span>
        <span>可用</span>
      </div>

      </div>
    </div>
</template>
<script type="es6">
import {XHeader,Group,Cell,Icon,XInput} from 'vux'

export default{
  data(){
    return{
      isShow:false,
      isTShow:true,
      isWShow:false,
      isMShow:false,
      isQShow:false,
      isYShow:false,
      selectedTime:'今天',
      selectOptions:['今天','本周','本月','本季','本年'],
    }
  },
  methods:{
    show(){
      if(this.isShow){
        this.isShow=false;
      }
      else{
        this.isShow=true;
      }
    },
    selectT(){
      if(this.isTShow||this.isWShow||this.isMShow||this.isQShow||this.isYShow){
        this.isTShow=this.isWShow=this.isMShow=this.isQShow=this.isYShow=false;
      }
      this.isTShow=true;
      this.selectedTime='今天';
      this.isShow=false;
    },
    selectW(){
      if(this.isTShow||this.isWShow||this.isMShow||this.isQShow||this.isYShow){
        this.isTShow=this.isWShow=this.isMShow=this.isQShow=this.isYShow=false;
      }
      this.isWShow=true;
      this.selectedTime='本周';
      this.isShow=false;
    },
    selectM(){
      if(this.isTShow||this.isWShow||this.isMShow||this.isQShow||this.isYShow){
        this.isTShow=this.isWShow=this.isMShow=this.isQShow=this.isYShow=false;
      }
      this.isMShow=true;
      this.selectedTime='本月';
      this.isShow=false;
    },
    selectQ(){
      if(this.isTShow||this.isWShow||this.isMShow||this.isQShow||this.isYShow){
        this.isTShow=this.isWShow=this.isMShow=this.isQShow=this.isYShow=false;
      }
      this.isQShow=true;
      this.selectedTime='本季';
      this.isShow=false;
    },
    selectY(){
      if(this.isTShow||this.isWShow||this.isMShow||this.isQShow||this.isYShow){
        this.isTShow=this.isWShow=this.isMShow=this.isQShow=this.isYShow=false;
      }
      this.isYShow=true;
      this.selectedTime='本年';
      this.isShow=false;
    },
  },
  mounted:function () {
  },
  components:{
    XHeader,
    Group,
    Cell,
    Icon,
    XInput
  }
}
</script>
<style scoped>
  .select{
  margin-left:70px;
  width:30%;
}

  /* 链接样式 */
  a:-webkit-any-link {
  color:black;
}
.select-option{
  position:absolute;
  z-index:5;
  top:45px;
  width:100%;
}

/* 选择框选项是否显示样式  */
.is-show{
  display:block;
}
.is-not-show{
  display:none;
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
  float:left;
  border-bottom:15px solid #DCDCDC;
}
.use{
  width:43%;
}
.un-use{
  width:47%;
  border-left:1px dotted;
}
</style>
