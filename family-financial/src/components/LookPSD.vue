
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
  const code="";
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
      var _this=this;
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
         // this.$store.commit('confirmPhone',this.cellphone);
          _this.$instance.post(
            'user/testPhone',{
              phone:_this.cellphone
            })
            .then(function(response){
              console.log(response);
              if(response.status==200){
                var res=response.data;
                if(res.code==404){
                  _this.toastShow=true;
                  _this.toastText="该手机号未注册过";
                }else{
                  //一分钟后可再次点击获取验证码按钮
                  _this.setClickAgain();
                  //获得验证码
                  //this.$store.commit('getTestCode',this.cellphone);
                  _this.$instance.post(
                    'user/sendSMS',{
                      "phone":_this.cellphone
                    })
                    .then(function(response){
                      console.log(response);
                      if(response.status==200){
                        var res=response.data;
                        if(res.code===200){
                          _this.code=res.message;
                        }else if(res.code===400){
                          _this.toastShow=true;
                          _this.toastText="验证码发送失败！";
                        }
                      }
                    })
                    .catch(function(err){
                      console.log(err);
                    });
                }
              }

            })
            .catch(function(err){
              console.log(err);
            });
        }else{
          this.toastShow=true;
          this.toastText="手机号格式错误！";
        }
      }
    },
    //测试完成
    setNewPSD(){
      //验证码不为空，且正确
      if(this.testCode==""){
        this.toastShow=true;
        this.toastText="验证码不能为空！";
      }else{
        if(this.testCode==this.code){
          this.$store.commit("setCellPhone",this.cellphone);
          this.$router.push('/setnewPSD');
        }else{
          this.toastShow=true;
          this.toastText="验证码错误！";
        }
      }
    }
  },
  mounted:function(){
    //第一个输入框取得焦点
    var inputs = document.getElementById('look_PSD').getElementsByTagName('input');
    inputs[0].focus();
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
