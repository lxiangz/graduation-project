<template>
  <div id="register">
    <x-header :left-options="{backText: '手机号注册'}"></x-header>
    <group gutter="0">
      <x-input type="tel" required placeholder=" 请输入手机号"  v-model="cellphone" >
        <img  slot="label" src="../assets/img/cellphone.png" />
        <x-button slot="right" mini type="default" action-type="button" :disabled="isGetCode" style="padding:0 7px;height:30px" @click.native="getCode" >{{getCodeText}}</x-button>
      </x-input>
      <x-input  v-model="testCode" required placeholder=" 请输入验证码">
        <img  slot="label" width="25px" src="../assets/img/test_code.png"  />
      </x-input>
      <x-input type="password"  required v-model="password"  placeholder=" 请输入密码">
        <img  slot="label" width="25px" src="../assets/img/password.png" />
      </x-input>
    </group>
     <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" type="warn"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
    <!--显示提示信息-->
    <toast v-model="textShow" width="20em" :type="textType" :time="5000"  position="default">
      <span slot="default">{{text}}</span>
    </toast>

    <box gap="15px 20px" >
      <x-button type="primary" action-type="button" @click.native="completed">完成注册</x-button>
    </box>
  </div>
</template>
<script type="es6">
  import hex_md5 from '../assets/js/md5.js'
  const code="";
  import {Group,XInput,XHeader,XImg,XButton,Box,Toast } from 'vux'
  export default{
    data(){
      return {
        //文本框绑定数据
        cellphone: "",
        testCode: "",
        password: "",
        isGetCode: false,//控制按钮是否允许点击，disabled属性绑定数据
        getCodeText: "获取验证码",//获取验证码按钮文字
        //提示框信息
        toastShow: false,
        toastText: "",
        textShow: false,
        text: "",
        textType:"text"

      }
    },
    methods: {
      //一分钟后可再次点击获取验证码按钮
      setClickAgain(){
        this.isGetCode = true;//控制按钮是否允许点击，disabled属性绑定数据
        var time = 60;
        var _this = this;
        //每一秒改变按钮text（_this.getCodeText）
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
        var _this=this;//在请求方法内this.作用域改变
        //验证手机号格式，this.cellphone获取用户输入的数据
        if (this.cellphone === "") {
          this.toastShow = true;
          this.toastText = "手机号不能为空";
        } else {
          var tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
          var re = new RegExp(tel);//验证手机号吗格式是否正确
          if (re.test(this.cellphone)) {
            _this.$instance.post( //发送请求，验证手机号是否已注册过
              'user/testPhone',{phone:_this.cellphone})
              .then(function(response){
                console.log(response);
                if(response.status==200){
                  var res=response.data;
                  if(res.code==404){
                    //一分钟后可再次点击获取验证码按钮
                    _this.setClickAgain();
                    //未注册过，获得验证码
                    _this.$instance.post(
                      'user/sendSMS',{"phone":_this.cellphone})
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
                        }else if(response.status==500){
                          _this.toastShow=true;
                          _this.toastText="验证码发送失败！";
                        }
                      })
                      .catch(function(err){
                        console.log(err);
                      });
                  }else{
                    _this.toastShow=true;
                    _this.toastText="该手机号已注册过";
                  }
                }
              })
              .catch(function(err){
                console.log(err);
              });
          } else {
            this.toastShow = true;
            this.toastText = "手机号格式错误！";
          }
        }
      },
      //完成注册，注册成功同时登陆
      //测试完成
      completed(){
        var _this=this;
        //验证验证码不为空且正确，this.testCode获取用户输入的验证码
        if(this.testCode==""){
          this.toastShow = true;
          this.toastText = "验证码不能为空！";
        }else{
          //验证验证码是否正确，this.code获取发送验证码成功后的验证码
          if(this.testCode==this.code){
             //验证码正确时验证密码，this.password获取用户输入的密码
             if(this.password==""){
               this.toastShow = true;
               this.toastText = "密码不能为空！";
             }else{
               //验证密码格式是否正确(长度在6-16位,必须由字母、数字、特殊符号组成)
               var psd = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,16}$/;
               var re = new RegExp(psd);
               if(re.test(this.password)){
                 var md5Psd=hex_md5(this.password);//密码加密
                 _this.$instance.post(  // 发送请求，注册成功，直接登陆
                   'user/register',{phone:this.cellphone,password:md5Psd,code:this.testCode})
                   .then(function(response){
                     if(response.status==200){
                       var res=response.data;
                       if(res.code==404){
                         _this.toastShow = true;
                         _this.toastText = "注册失败！";
                       }else{
                         _this.textShow = true;
                         _this.text = "注册成功，将转到登陆页面！";
                         _this.textType="default";
                         setTimeout(function(){
                           //转到登陆页面
                           _this.$router.push("/login");
                         },3000)
                       }
                     }else{
                       _this.toastShow = true;
                       _this.toastText = "注册失败！";
                     }
                   })
                   .catch(function(err){
                     console.log(err);
                   });
               }else{
                 this.toastShow = true;
                 this.toastText = "密码格式错误！";
               }
             }
           }else{
             this.toastShow = true;
             this.toastText = "验证码错误！";
           }
        }
      }

    },
    mounted: function () {
      //第一个输入框取得焦点
      var inputs = document.getElementById('register').getElementsByTagName('input');
      inputs[0].focus();
      var _this=this;
      //为密码框添加获得焦点事件
      inputs[2].onfocus = function () {;
        _this.textShow = true;
        _this.text = "长度在6-16位,由字母、数字、特殊符号组成";
        _this.textType="text";
      };
    },
    components: {
      Group,
      XInput,
      XHeader,
      XImg,
      XButton,
      Box,
      Toast
    }
  }

</script>
<style scoped></style>
