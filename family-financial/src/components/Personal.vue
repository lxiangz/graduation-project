<template>
  <div id="personal">
    <x-header :left-options="{backText: '我的资料'}"></x-header>
    <group>
      <cell is-link title="头像"  @click.native="selectImg">
        <img slot="default" width="40px" src="../assets/logo.png" />
      </cell>
      <cell is-link title="昵称" :value="name" link="/changename"></cell>
      <cell is-link title="手机号" :value="cellphone" link="/changetel"></cell>
    </group>
    <group>
      <cell is-link title="账号绑定">
        <div slot="default">
          <img width="25px" src="../assets/img/qq_icon.jpg" />
          <img width="25px" src="../assets/img/wechat_icon.png" />
          <img width="25px" src="../assets/img/blog_icon.png" />
        </div>
      </cell>
      <cell is-link title="关联账号" link="/addmember"></cell>
    </group>
    <box gap="15px 20px">
      <x-button type="primary" action-type="button" @click.native="exit">退出登陆</x-button>
    </box>

    <!--头像选择-->
    <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu-select="selectHeadImg"></actionsheet>
  </div>
</template>
<script type="es6">
 import {XHeader,Group,Cell,Box,XButton,Actionsheet} from 'vux'
export default{
  data(){
    return{
      name:"85805261mo",
      cellphone:"18580516162",
      show:false,
      menus: {
       select: '选择头像',
      },
    }
  },
  methods:{
    exit(){
      //设置当前登陆手机号为空
      this.$store.commit("setCellPhone","");
      this.$router.push("/personal");
    },
    selectImg(){
      this.show=true;
    },
    selectHeadImg(){
      // 从相册中选择图片
      plus.gallery.pick( function(path){
        console.log(path);
        plus.gallery.save(path , function () {
          console.log( "保存图片到相册成功" );
        } ,function(e){
          console.log(e.message);
          console.log( e.code);
          console.log( "保存图片到相册失败" );
        });
      }, function ( e ) {
        console.log( "取消选择图片" );
      }, {filter:"image"} );
    }
  },
  mounted:function(){
    this.cellphone=this.$store.state.cellphone;
  },
  components:{
    XHeader,
    Group,
    Cell,
    Box,
    XButton,
    Actionsheet
  }
}
</script>
<style scoped>
  img{
    border-radius:50%;
    border:1px solid #DCDCDC;
  }
</style>
