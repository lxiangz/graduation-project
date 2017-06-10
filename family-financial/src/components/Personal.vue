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
    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
    <!--头像选择-->
    <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu-select="selectHeadImg"></actionsheet>
  </div>
</template>
<script type="es6">

 import {XHeader,Group,Cell,Box,XButton,Actionsheet,Toast} from 'vux'
export default{
  data(){
    return{
      name:"85805261mo",
      cellphone:"18580516162",
      show:false,
      menus: {
       select: '选择头像',
      },

      //显示警告信息
      toastShow:false,
      toastText:"",
      toastType:"warn",
    }
  },
  methods:{
    exit(){
      var _this=this;
      //退出登陆
      this.$instance.get('user/loginOut').then(function(response){
        console.log(response);
        console.log(response.data);
        if(response.status==200){
          var res=response.data;
          if(res.code===200){
            //转到主页
            _this.$router.push("/home");
          }else if(res.code===400){

          }
        }
      })
        .catch(function(err){
          console.log(err);
        });

    },
    selectImg(){
      this.show=true;
    },
    selectHeadImg(){
      this.galleryImg();
    },
    //相册选取图片
    galleryImg() {
      var _this=this;
   plus.gallery.pick( function(path){
     //path：返回选择的图片路径
     // 通过URL参数获取目录对象或文件对象
     //entry:请求到的目录或文件对象
     plus.io.resolveLocalFileSystemURL(path, function(entry) {
       //压缩图片
       _this.compressImage(entry.toLocalURL(),entry.name);
     }, function(e) {
       this.toastShow=true;
       this.toastText="读取相册文件错误：" + e.message;
       this.toastType="warn";
     });
   }, function ( e ) {
   }, {
     filename: "_doc/camera/",
     filter:"image"
   } );
 },
    //压缩图片
    compressImage(url,filename){
      var _this=this;
      var name="_doc/app/"+filename;//_doc/upload/F_ZDDZZ-1467602809090.jpg
      plus.zip.compressImage({
       src:url,//src: (String 类型 )压缩转换原始图片的路径
       dst:name,//压缩转换目标图片的路径
       quality:20,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
       overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件
     },
        //可通过event.target（String类型）获取压缩转换后的图片url本地绝对路径
     function(event) {
       var path = name;//压缩转换目标图片的本地相对路径
       //filename图片名称
       _this.saveImage(event.target,filename,path);
     },function(error) {
          this.toastShow=true;
          this.toastText="图片压缩失败，请稍后再试";
          this.toastType="warn";
     });
 },
    //本地保存图片数据
    saveImage(url,name,path){
      //this.headImage=require("../assets/logo.png");
      name=name.substring(0,name.indexOf("."));
    //获得用户id
  var itemname="icon18";
   var itemvalue=plus.storage.getItem(itemname);   //通过键(key)检索获取应用存储的值
     itemvalue="{"+name+","+path+","+url+"}";
      //console.log(itemvalue);
   plus.storage.setItem(itemname, itemvalue);  //修改或添加键值(key-value)对数据到应用数据存储中
      document.getElementsByTagName("img")[0].src=url;
      console.log(document.getElementsByTagName("img")[0].src);
 },
    //上传图片
   uploadImage(){

   }

 },
  mounted:function(){
    console.log(document.getElementsByTagName("img")[0].src);
  //获取昵称、手机号 测试完成
    //获取头像、昵称、手机号
    var _this=this;
    this.$instance.get('user/getUser').then(function(response){
        console.log(response);
      console.log(response.data);
        if(response.status==200){
          var res=response.data;
          if(res.code===200){
            console.log("sss");
            _this.name=res.user.username;
            _this.cellphone=res.user.phone;
          }else if(res.code===400){
            console.log(res.message);
          }
        }
      })
      .catch(function(err){
        console.log(err);
      });
  },
  components:{
    XHeader,
    Group,
    Cell,
    Box,
    XButton,
    Actionsheet,
    Toast
  }
}
</script>
<style scoped>
  img{
    border-radius:50%;
    border:1px solid #DCDCDC;
  }
</style>
