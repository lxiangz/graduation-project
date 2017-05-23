<template>
  <div id="add-member">
    <x-header :left-options="{backText: '关联账号'}"></x-header>
    <group gutter="0">
      <x-input type="tel" required placeholder=" 输入关联手机号"  v-model="cellphone" >
        <img  slot="label" src="../assets/img/cellphone.png" />
        <x-button slot="right" mini type="default" action-type="button" :disabled="isGetCode" style="padding:0 7px;height:30px" @click.native="getCode" >{{getCodeText}}</x-button>
      </x-input>
      <x-input  v-model="testCode" required placeholder=" 请输入验证码">
        <img  slot="label" width="25px" src="../assets/img/test_code.png" />
      </x-input>
    </group>

    <box gap="15px 20px">
      <x-button type="primary" action-type="button" @click.native="confirm">确定</x-button>
    </box>
    <div class="blank">&nbsp;</div>
    <group gutter="0">
      <cell title="已关联账号："></cell>
    </group>
    <!--显示已关联账号信息-->
    <div>
      <box class="related-account">
        <div class="little-container">
          <a>
            <img  src="../assets/img/icon_nav_msg.png" />
            <span>家庭公共</span>
          </a>
        </div>
        <div class="little-container">
          <a>
            <img width="56px" src="../assets/logo.png" />
            <span>好奇宝宝</span>
          </a>
        </div>
      </box>
    </div>
  </div>
</template>
<script type="es6">
  import axios from 'axios'
  const instance = axios.create({
    baseURL:"http://172.16.99.106:8080/user/",
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

 import {XHeader,Cell,Group,Box,XButton,XInput} from 'vux'
 const code="";
export default{
  data(){
    return{
      cellphone:"",
      testCode:"",
      getCodeText:"获取验证码",
      isGetCode:false,
    }
  },
  methods:{
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
            instance.post(
              'testPhone',{
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
                   // this.$store.commit('getTestCode',this.cellphone);
                    instance.post(
                      'sendSMS',{
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
                            _this.toastText="验证码发送失败";
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
    confirm(){
      //验证码不为空，且正确
      if(this.testCode==""){
        this.toastShow=true;
        this.toastText="验证码不能为空！";
      }else{
        if(this.testCode==this.code){
          //发送请求关联手机号
          //提示关联成功
          //下面的关联的手机号更新
        }else{
          this.toastShow=true;
          this.toastText="验证码错误！";
        }
      }
    }
  },
  mounted:function(){
    //第一个输入框取得焦点
    var inputs = document.getElementById('add-member').getElementsByTagName('input');
    inputs[0].focus();
  },
  components:{
    XHeader,
    Cell,
    Group,
    Box,
    XButton,
    XInput
  }
}
</script>
<style scoped>
  .blank{
    height:13px;
    background-color:	#DCDCDC;
  }
  /*关联账号*/
  .related-account{
    margin:10px 0 0 10px;
  }
  .related-account .little-container{
    float:left;
    margin:0 5px;
  }
  .related-account .little-container img{
    display:block;
    border-radius:50%;
    border:1px solid #DCDCDC;
  }
  .related-account .little-container span{
    font-size:13px;
    color:gray;
    display:block;
  }
/*  img{
    border-radius:50%;
    border:1px solid #DCDCDC;
  }*/
</style>
