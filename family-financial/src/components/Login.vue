<template>
  <div id="login" >
    <x-header :left-options="{backText: '登陆',preventGoBack:true}"  @on-click-back="back"></x-header>
    <div class="mode">
      <div class="login-mode">
        <a>
          <img width="45px" src="../assets/img/wechat_icon.png" />
          <span>微信</span>
        </a>
      </div>
      <div class="login-mode">
        <a>
          <img width="45px" src="../assets/img/qq_icon.jpg" />
          <span style="margin-left:9px;">QQ</span>
        </a>
      </div>
      <div class="login-mode">
        <a>
          <img width="45px" src="../assets/img/blog_icon.png" />
          <span>微博</span>
        </a>
      </div>
    </div>

    <group gutter="0">
      <x-input type="tel" required placeholder=" 请输入手机号"  v-model="cellphone" >
        <img  slot="label" width="25px" src="../assets/img/user.png" />
      </x-input>
      <x-input type="password"  required v-model="password" placeholder=" 请输入密码">
        <img  slot="label" width="25px" src="../assets/img/password.png" />
      </x-input>
    </group>

    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>

    <box gap="0px 15px" >
      <x-button style="width:145px;font-size: 16px;margin:0 3px;" type="primary" plain  mini action-type="button" @click.native="register">注册</x-button>
      <x-button style="width:145px;font-size: 16px;" type="primary" mini action-type="button" @click.native="login">登陆</x-button>
    </box>
    <div class="forget-psd">
      <a href="javascript:;" v-on:click="lookPSD">忘记密码？</a>
    </div>

  </div>
</template>

<script type="es6">
  import hex_md5 from '../assets/js/md5.js'
  import {XHeader,XButton,XInput,Group,Box,Toast} from 'vux'
  export default{
    data(){
      return {
        cellphone: "",//文本框绑定数据
        password: "",
        toastShow: false,
        toastText: "",
        toastType: "warn"
      }
    },
    methods: {
      back(){
        this.$router.push("/home");
      },
      register(){
        this.$router.push('/register')
      },
      lookPSD(){
        this.$router.push('/lookPSD')
      },
      //登陆
      //测试完成
      login(){ var _this = this;

        //验证手机号不为空，格式正确且该账号存在
        if (this.cellphone === "") {
          this.toastShow = true;
          this.toastText = "手机号不能为空";
          this.toastType = "warn";
        } else if (this.password === "") {
          this.toastShow = true;
          this.toastText = "密码不能为空";
          this.toastType = "warn";
        } else {
          //验证手机号码格式是否正确
          var tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
          var re = new RegExp(tel);
          if (re.test(this.cellphone)) {
            //验证该手机账号是否注册过
            _this.$instance.post(
              'user/testPhone', {
                phone: this.cellphone
              })
              .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                  var res = response.data;
                  if (res.code == 404) {
                    _this.toastShow = true;
                    _this.toastText = "该手机号未注册过";
                    _this.toastType = "warn";
                  } else {
                    var md5Psd=hex_md5(_this.password);
                    //请求数据，获得加密后的密码并比较
                    _this.$instance.post(
                      'user/login', {
                        phone: _this.cellphone,
                        password:md5Psd
                      })
                      .then(function (response) {
                        if (response.status == 200) {
                          var res = response.data;
                          if (res.code == 404) {
                            _this.toastShow = true;
                            _this.toastText = res.message;
                            _this.toastType = "warn";
                          } else { // 登陆成功
                            _this.toastShow = true;
                            _this.toastText = "登陆成功，将直接转到主页";
                            _this.toastType = "default";
                            setTimeout(function () {
                              _this.$router.push("/home")
                            }, 2000);
                          }
                        }
                      }).
                      catch(function (err) {
                        console.log(err);
                      });
                  }
                }
              }
            )
              .
              catch(function (err) {
                console.log(err);
              });
          }
          else {
            this.toastShow = true;
            this.toastText = "手机号格式错误";
            this.toastType = "warn";
          }
        }
      }
    },
    mounted: function () {
      //第一个输入框取得焦点
      var inputs = document.getElementById('login').getElementsByTagName('input');
      inputs[0].focus();
      var _this=this;
      plus.key.removeEventListener("backbutton",function(){
        console.log("remove");
      });
      plus.key.addEventListener("backbutton",function(){
        _this.back();
      });
    },
    components: {
      XHeader,
      XButton,
      XInput,
      Group,
      Box,
      Toast
    }
  }
</script>
<style scoped>
  .mode{
    padding-left:15px;
    padding-bottom:25px;
  }
  .login-mode{
    display: inline-block;
    padding:15px 20px;
  }
  .login-mode img{
    display:block;
    border-radius:50%;
    border:1px solid #DCDCDC;
    margin-bottom:5px;
  }
  .login-mode span{
    padding-left:7px;
  }
  .forget-psd{
    font-size:x-small;
    color:grey;
    padding:10px 10px 0 285px;
  }
  a:-webkit-any-link {
    color:black;
  }
</style>
