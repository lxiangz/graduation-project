<template>
  <div id="change-tel">
    <div>
      <x-header :left-options="{backText: '修改手机号',preventGoBack:true}"  @on-click-back="back"></x-header>
      <group gutter="0">
        <x-input type="tel" required placeholder=" 请输入手机号"  v-model="cellphone" >
          <img  slot="label" src="../assets/img/cellphone.png" />
          <x-button slot="right" mini type="default" action-type="button" :disabled="isGetCode" style="padding:0 7px;height:30px" @click.native="getCode" >{{getCodeText}}</x-button>
        </x-input>
        <x-input  v-model="testCode" required placeholder=" 请输入验证码">
          <img  slot="label" width="25px" src="../assets/img/test_code.png"  />
        </x-input>
      </group>
      <box  gap="10px 20px">
        <x-button type="primary" action-type="button" @click.native="confirm">确定</x-button>
      </box>
    </div>
    <div>
      <!--显示警告信息-->
      <toast v-model="toastShow" width="9.5em" :type="toastType"  position="top">
        <span slot="default">{{toastText}}</span>
      </toast>
      <!--显示弹框信息-->
      <confirm v-model="show"
               title=""
               mask-transition="vux-fade"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <group slot="default" gutter="0">
          <x-input id="password" style="border-top:1px solid #DCDCDC" type="password" required placeholder="为了安全请输入密码确认！" v-model="password"></x-input>
        </group>
      </confirm>
    </div>




  </div>
</template>
<script type="es6">
  const code="";//验证码
  import hex_md5 from '../assets/js/md5.js'
  import {XHeader,XInput,XButton,Group,Box,Toast,Confirm} from 'vux'
export default{
  data(){
    return{
      cellphone:"",//输入手机号
      testCode:"",//输入验证码
      isGetCode:false,//获取验证码是否允许点击
      getCodeText:"获取验证码",//获取验证码按钮文字
      show:false,//密码确认框是否显示
      password:"",//输入密码
      isRight:false,//密码是否确认正确

      toastShow:false,
      toastText:"",
      toastType:"warn",

    }
  },
  mounted: function () {
    /* 第一个输入框取得焦点 */
    var inputs=document.getElementById('change-tel').getElementsByTagName('input');
    inputs[0].focus();
    var _this=this;
    plus.key.addEventListener("backbutton",function(){
      _this.back();
    });
  },
  methods:{
    back(){
      this.$router.push("/personal");
    },
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
      var _this=this;
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
          //this.$store.commit('confirmPhone',this.cellphone);
          _this.$instance.post(
            'user/testPhone',{
              phone:_this.cellphone
            })
            .then(function(response){
              console.log(response);
              if(response.status==200){
                var res=response.data;
                if(res.code==200){
                  _this.toastShow=true;
                  _this.toastText="该手机号已注册";
                  _this.toastType="warn";
                }else{
                  //一分钟后可再次点击获取验证码按钮
                  _this.setClickAgain();
                  //获得验证码
                  //this.$store.commit('getTestCode', this.cellphone);
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
                          _this.toastType="warn";
                        }
                      }else{
                        _this.toastShow=true;
                        _this.toastText="验证码发送失败！";
                        _this.toastType="warn";
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
        } else {
          this.toastShow = true;
          this.toastText = "手机号格式错误！";
          this.toastType="warn";
        }
      }
    },
    confirm(){
      var _this=this;
     if(this.testCode==""){
        this.toastShow = true;
        this.toastText = "验证码不能为空！";
        this.toastType="warn";
      }else if(this.testCode==this.code){
        //修改手机号
       //弹出密码确认框
       if(_this.isRight==false){
         this.show=true;
         //document.getElementById('password').getElementsByTagName('input')[0].focus();
       }else{
         //如果密码正确进行修改手机操作
         _this.$instance.post(
           'user/update',{
             "phone":_this.cellphone
           })
           .then(function(response){
             console.log(response);
             if(response.status==200){
               var res=response.data;
               if(res.code===200){
                 _this.toastShow = true;
                 _this.toastText = "手机号修改成功！";
                 _this.toastType="default";
                 _this.testCode="";
                 //_this.cellphone="";
               }else if(res.code===404){
                 _this.toastShow = true;
                 _this.toastText = "手机号修改失败！";
                 _this.toastType="warn";
               }
             }
           })
           .catch(function(err){
             console.log(err);
           });
       }

      }else{
        this.toastShow = true;
        this.toastText = "验证码错误！";
        this.toastType="warn";
      }
    },
    onCancel(){
      this.show=false;
    },
    onConfirm(){
      var _this=this;
      //比较密码是否正确
      if(this.password==""){
        this.toastShow = true;
        this.toastText = "密码不能为空！";
        this.toastType="warn";
      }else{
        //发送请求正确与否
        this.$instance.post(
          'user/testPsd',{
            "password":hex_md5(_this.password)
          })
          .then(function(response){
            console.log(response);
            if(response.status==200){
              var res=response.data;
              if(res.code===200){
               _this.isRight=true;
                _this.show=false;
                _this.toastShow = true;
                _this.toastText = "密码确认正确，请再次点击确认按钮！";
                _this.toastType="warn";
              }else if(res.code===404){
                _this.toastShow = true;
                _this.toastText = "密码错误！";
                _this.toastType="warn";
              }
            }
          })
          .catch(function(err){
            console.log(err);
          });
      }
    }
  },
  components:{
    XHeader,
    XInput,
    XButton,
    Group,
    Box,
    Toast,
    Confirm
  }
}
</script>
<style scoped>

</style>
