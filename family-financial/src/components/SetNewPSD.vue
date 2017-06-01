<template>
  <div id="set_new_PSD">
    <x-header :left-options="{backText: '设置新密码'}"></x-header>
    <span class="warn">*设置新的密码</span>
    <group gutter="0">
      <x-input id="set_PSD" class="psd_input" v-model="newPSD" type="password" required placeholder="6-16位,由字母、数字、特殊符号组成" ></x-input>
    </group>
    <span  class="warn">*请重复输入一次进行确认</span>
    <group gutter="0">
      <x-input class="psd_input" v-model="againPSD"  type="password" required placeholder="请重复输入一次进行确认"  ></x-input>
    </group>
    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" type="warn"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
    <!--显示提示信息-->
    <toast v-model="textShow" type="default" width="9.5em"  position="top">
      <span slot="default">{{text}}</span>
    </toast>
    <box gap="15px 20px" >
      <x-button type="primary" action-type="button" @click.native="confirm">确定</x-button>
    </box>
  </div>
</template>

<script type="es6">
  import hex_md5 from '../assets/js/md5.js'
  import {XHeader,Box,XButton,XInput,Group,Popover,Toast} from 'vux'
export default{
  data(){
    return{
      newPSD:"",
      againPSD:"",
      toastShow:false,
      toastText:"",
      textShow:false,
      text:""
    }
  },
  methods:{
    //测试完成
    confirm(){
      var _this=this;
      //验证均不为空，验证密码格式，验证是否相等
      if(this.newPSD==""){
        this.toastShow=true;
        this.toastText="新密码不能为空"
      }else if(this.againPSD==""){
        this.toastShow=true;
        this.toastText="确认密码不能为空"
      }else{
        //验证密码格式是否正确(长度在6-16位,由字母、数字、特殊符号组成)
        var psd = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,16}$/;
        var re = new RegExp(psd);
        if(re.test(this.newPSD)){
          //验证两者是否相等
          if(this.newPSD==this.againPSD){
            //密码加密
            var md5Psd=hex_md5(this.newPSD);
            //发送请求
            _this.$instance.post(
              'user/setNewPSD',{
                phone:_this.$store.state.cellphone,
                password:md5Psd
              })
              .then(function(response){
                console.log(response);
                console.log(response.data);
                if(response.status==200){
                  var res=response.data;
                  if(res.code==200){
                    _this.textShow=true;
                    _this.text="密码修改成功，转到登陆页面"
                    //转到登陆页面
                    setTimeout(function(){
                      _this.$router.push("/login");
                    },3000);
                  } else{
                    _this.toastShow=true;
                    _this.toastText="密码修改失败！"
                  }
                }
              })
              .catch(function(err){
                console.log(err);
              });
          }else{
            this.toastShow=true;
            this.toastText="两者不一致"
          }
        }else{
          this.toastShow=true;
          this.toastText="新密码格式错误"
        }
      }
    }
  },
  components:{
    XHeader,
    Box,
    XButton,
    XInput,
    Group,
    Popover,
    Toast
  },
  mounted: function () {
    /* 第一个输入框取得焦点 */
    var set_PSD=document.getElementById('set_PSD').getElementsByTagName('input');
     set_PSD[0].focus();
  }
}

</script>
<style scoped>
  .warn{
    display:block;
    padding:5px 10px;
  }
  .psd_input{
    border-top:1px solid #DCDCDC;
    border-bottom:1px solid #DCDCDC;
  }
</style>
