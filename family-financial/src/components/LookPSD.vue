
<template>
  <div id="look_PSD">
    <x-header :left-options="{backText: '忘记密码'}"></x-header>
    <group gutter="0">
      <x-input type="tel" required placeholder=" 输入您的手机号"  v-model="cellphone" >
        <img  slot="label" src="../assets/img/cellphone.png" />
        <x-button slot="right" mini type="default" action-type="button" :disabled="isGetCode" style="padding:0 7px;height:30px" @click.native="getCode" >{{getCodeText}}</x-button>
      </x-input>
      <x-input  v-model="testCode" required placeholder=" 请输入验证码">
        <img  slot="label" width="25px" src="../assets/img/test_code.png" />
      </x-input>
    </group>

    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" type="warn"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
    <box gap="15px 20px" >
      <x-button type="primary" action-type="button" @click.native="setNewPSD">下一步</x-button>
    </box>
  </div>
</template>

<script type="es6">
  import {XHeader,Group,XInput,XButton,Box,Toast} from 'vux'
export default{
  data(){
    return{
      cellphone:"",
      testCode:"",
      isGetCode:false,
      getCodeText:"获取验证码",
      toastShow:false,
      toastText:"",
    }
  },
  methods:{
    //一分钟后可再次点击获取验证码按钮
    setClickAgain(){
      this.isGetCode=true;
      var time=60;
      var _this=this;
      //每一秒改变按钮text
      var setText = window.setInterval(function () {
        console.log(_this.getCodeText);
        _this.getCodeText=(time--).toString()+"秒后可重新发送";
        //去掉定时器的方法
        if(time==-1){
          _this.isGetCode=false;
          _this.getCodeText="获取验证码";
          window.clearInterval(setText);
        }
      },1000);

    },
    getCode(){
      //验证是否为空
      if(this.cellphone===""){
        this.toastShow=true;
        this.toastText="手机号不能为空";
      }else{
        //验证手机号吗格式是否正确
        var tel =/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
        var re = new RegExp(tel);
        if (re.test(this.cellphone)) {
          //验证该手机账号是否存在过
          this.$store.commit('confirmPhone',this.cellphone);
          if(this.$store.state.phoneIsExist==false){
            this.toastShow=true;
            this.toastText="该手机号未注册过";
          }else{
            //一分钟后可再次点击获取验证码按钮
            this.setClickAgain();
            //获得验证码
            this.$store.commit('getTestCode',this.cellphone);
          }
        }else{
          this.toastShow=true;
          this.toastText="手机号格式错误！";
        }
      }
    },
    setNewPSD(){
      //验证码不为空，且正确
      if(this.testCode==""){
        this.toastShow=true;
        this.toastText="验证码不能为空！";
      }else{
        if(this.testCode==this.$store.state.testCode){
          //设置手机号
          this.$store.commit("login",state,this.cellphone,"");
          //转到设置新密码页面
          this.$router.push('/setnewPSD');
        }else{
          this.toastShow=true;
          this.toastText="验证码错误！";
        }
      }
    }
  },
  components:{
    XHeader,
    Group,
    XInput,
    XButton,
    Box,
    Toast
  }
}

</script>
<style scoped></style>
