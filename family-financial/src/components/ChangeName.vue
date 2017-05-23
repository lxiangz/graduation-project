<template>
  <div id="change-name">
    <x-header :left-options="{backText: '修改昵称'}"></x-header>
    <group gutter="0">
      <x-input  v-model="name" type="text" required placeholder="请输入新昵称" ></x-input>
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
      name:"",
      toastShow:false,
      toastText:"",
      toastType:"warn"
    }
  },
  mounted: function () {
    /* 第一个输入框取得焦点 */
    var inputs=document.getElementById('change-name').getElementsByTagName('input');
    inputs[0].focus();
  },
  methods:{
    confirm(){
      var _this=this;
      if(this.name==""){
        this.toastShow=true;
        this.toastText="昵称不能为空";
        this.toastType="warn";
      }else if(this.name.length<10){
        //修改昵称
       // this.$store.commit("setName",name);
        this.$instance.post(
          'update',{
            name:_this.name
          })
          .then(function(response){
            console.log(response);
            console.log(response.data);
            if(response.status==200){
              var res=response.data;
              if(res.code==200){
                _this.toastShow=true;
                _this.toastText="昵称修改成功";
                _this.toastType="default";
              }else{
                _this.toastShow=true;
                _this.toastText="昵称重复！";
                _this.toastType="warn";
              }
            }
          })
          .catch(function(err){
            console.log(err);
          });
      }else{
        this.toastShow=true;
        this.toastText="字符长度过长";
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
