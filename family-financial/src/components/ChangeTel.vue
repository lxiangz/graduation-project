<template>
  <div id="change-tel">
    <x-header :left-options="{backText: '修改手机号'}"></x-header>
    <group gutter="0">
      <x-input type="tel" required placeholder=" 请输入手机号"  v-model="cellphone" >
        <img  slot="label" src="../assets/img/cellphone.png" />
        <x-button slot="right" mini type="default" action-type="button" :disabled="isGetCode" style="padding:0 7px;height:30px" @click.native="getCode" >{{getCodeText}}</x-button>
      </x-input>
      <x-input  v-model="testCode" required placeholder=" 请输入验证码">
        <img  slot="label" width="25px" src="../assets/img/test_code.png"  />
      </x-input>
    </group>
    <box gap="15px 20px" >
      <x-button type="primary" action-type="button" @click.native="confirm">确定</x-button>
    </box>

    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
  </div>
</template>
<script type="es6">
  import {XHeader,XInput,XButton,Group,Box,Toast} from 'vux'
export default{
  data(){
    return{
      cellphone:"",
      testCode:"",
      isGetCode:false,
      toastShow:false,
      toastText:"",
      getCodeText:"获取验证码",
      toastType:"warn"
    }
  },
  mounted: function () {
    /* 第一个输入框取得焦点 */
    var inputs=document.getElementById('change-name').getElementsByTagName('input');
    inputs[0].focus();
  },
  methods:{
    //一分钟后可再次点击获取验证码按钮
    setClickAgain(){
      this.isGetCode = true;
      var time = 60;
      var _this = this;
      //每一秒改变按钮text
      var setText = window.setInterval(function () {
        _this.getCodeText = (time--).toString() + "秒后可重新发送";
        //去掉定时器的方法
        if (time == -1) {
          _this.isGetCode = false;
          _this.getCodeText = "获取验证码";
          window.clearInterval(setText);
        }
      }, 1000);
    },
    getCode(){
      //验证是否为空
      if (this.cellphone === "") {
        this.toastShow = true;
        this.toastText = "手机号不能为空";
        this.toastType="warn";
      } else {
        //验证手机号吗格式是否正确
        var tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
        var re = new RegExp(tel);
        if (re.test(this.cellphone)) {
          //验证手机号是否已注册过
          this.$store.commit('confirmPhone',this.cellphone);
          if(this.$store.state.phoneIsExist){
            this.toastShow=true;
            this.toastText="该手机号已注册过";
            this.toastType="warn";
          }else{
            //一分钟后可再次点击获取验证码按钮
            this.setClickAgain();
            //获得验证码
            this.$store.commit('getTestCode', this.cellphone);
          }
        } else {
          this.toastShow = true;
          this.toastText = "手机号格式错误！";
          this.toastType="warn";
        }
      }
    },
    confirm(){
      if(this.testCode==""){
        this.toastShow = true;
        this.toastText = "验证码不能为空！";
        this.toastType="warn";
      }else if(this.testCode==this.$store.state.testCode){
        //修改手机号
        this.$store.commit("setPhone",this.cellphone);
        if(this.$store.state.isChangeTel){
          this.toastShow = true;
          this.toastText = "手机号修改成功！";
          this.toastType="default";
        }
      }else{
        this.toastShow = true;
        this.toastText = "验证码错误！";
        this.toastType="warn";
      }
    }
  },
  components:{
    XHeader,
    XInput,
    XButton,
    Group,
    Box,
    Toast
  }
}
</script>
<style scoped></style>
