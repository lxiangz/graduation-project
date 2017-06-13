<template>
  <div id="personal">
    <x-header :left-options="{backText: '我的资料'}"></x-header>
    <group>
      <cell is-link title="头像"  @click.native="selectImg">
        <img slot="default" width="40px" src="../assets/vux_logo.png" />
      </cell>
      <cell is-link title="昵称" :value="name" link="/changename"></cell>
      <cell is-link title="手机号" :value="cellphone" link="/changetel"></cell>
    </group>
    <group>
      <cell is-link title="账号绑定">
        <div slot="default">
          <img class="login" width="25px" src="../assets/img/qq_icon.jpg" />
          <img class="login" width="25px" src="../assets/img/wechat_icon.png" />
          <img class="login" width="25px" src="../assets/img/blog_icon.png" />
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

    <!--裁剪遮罩层 获取到图片文件时展示，默认隐藏-->
    <div class="clip-wp" id="clip-wp" v-show="isClip" >
      <div id="container"></div>
      <box gap="15px 20px">
        <x-button type="primary"  id="save-img"  action-type="button" @click.native="saveImg">保存</x-button>
      </box>
    </div>

    <!--头像选择-->
    <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu-select="selectHeadImg"></actionsheet>
  </div>
</template>
<script type="es6">
  import clip from '../assets/js/clip';
  import {XHeader,Group,Cell,Box,XButton,Actionsheet,Toast} from 'vux'
  export default{
    data(){
      return {
        name: "85805261mo",//昵称
        cellphone: "18580516162",//手机号
        show: false,//头像选择actionSheet是否展示
        menus: {     //头像选择actionSheet菜单
          select: '选择头像',
        },
        //裁剪属性
        isClip: false,
        clipUrl: '',
        noScoll: function (evt) {
          this.isClip && evt.preventDefault();
        },
        clip: {},

        //显示警告信息
        toastShow: false,
        toastText: "",
        toastType: "warn",
      }
    },
    methods: {
      exit(){
        var _this = this;
        //退出登陆
        this.$instance.get('user/loginOut').then(function (response) {
          console.log(response);
          console.log(response.data);
          if (response.status == 200) {
            var res = response.data;
            if (res.code === 200) {
              //转到主页
              _this.$router.push("/home");
            } else if (res.code === 400) {

            }
          }
        })
          .catch(function (err) {
            console.log(err);
          });

      },
      selectImg(){
        this.show = true;
      },
      selectHeadImg(){
        this.galleryImg();
      },
      //相册选取图片
      galleryImg() {
        var _this = this;
        plus.gallery.pick(function (path) {
          //path：返回选择的图片路径
          // 通过URL参数获取目录对象或文件对象
          //entry:请求到的目录或文件对象
          plus.io.resolveLocalFileSystemURL(path, function (entry) {
            //压缩图片
            _this.compressImage(entry.toLocalURL(), entry.name);
          }, function (e) {
            this.toastShow = true;
            this.toastText = "读取相册文件错误：" + e.message;
            this.toastType = "warn";
          });
        }, function (e) {
        }, {
          filename: "_doc/camera/",
          filter: "image"
        });
      },
      //压缩图片
      compressImage(url, filename){
        var _this = this;
        var name = "_doc/app/" + filename;//_doc/upload/F_ZDDZZ-1467602809090.jpg
        plus.zip.compressImage({
            src: url,//src: (String 类型 )压缩转换原始图片的路径
            dst: name,//压缩转换目标图片的路径
            quality: 20,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
            overwrite: true//overwrite: (Boolean 类型 )覆盖生成新文件
          },
          //可通过event.target（String类型）获取压缩转换后的图片url本地绝对路径
          function (event) {
            var path = name;//压缩转换目标图片的本地相对路径
            _this.clipImg(event.target);//裁剪图片
          }, function (error) {
            this.toastShow = true;
            this.toastText = "图片压缩失败，请稍后再试";
            this.toastType = "warn";
          });
      },
      //裁剪图片
      clipImg(url){
        this.clip = new clip('container', this);
        this.clip.init(url);
        this.isClip = true;
        document.body.addEventListener('touchmove', this.noScoll, false);
      },
      saveImg(){
        this.isClip = false;
        this.clip.save();
        document.body.removeEventListener('touchmove', this.noScoll, false);
        this.uploadImg(this.clipUrl);
      },
      uploadImg(url){
        var _this=this;
        var canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img,0,0);
          var dataURL = canvas.toDataURL();
          canvas = null;
          //上传服务器
          _this.$instance.post('pic/upload',{
            uploadFile:dataURL
          }).then(function(response){
              if(response.status==200){
                var res=response.data;
                console.log(response);
                if(res.code==200){
                  document.getElementsByTagName("img")[0].src=res.url;
                }else{
                }
              }else{
              }
            })
            .catch(function(err){
              console.log(err);
            });

        };
        img.src = require("../assets/logo.png");
      },
    },
    mounted: function () {
      //获取昵称、手机号 测试完成
      //获取头像、昵称、手机号
      var _this = this;
      this.uploadImg("");
      this.$instance.get('user/getUser').then(function (response) {
        if (response.status == 200) {
          var res = response.data;
          if (res.code === 200) {
            _this.name = res.user.username;
            _this.cellphone = res.user.phone;
          } else if (res.code === 400) {
            console.log(res.message);
          }
        }
      })
        .catch(function (err) {
          console.log(err);
        });
    },
    components: {
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
<style lang="less">
  img{
    border-radius:50%;
    border:1px solid #DCDCDC;
  }
  body{
    padding: 0;
    margin: 0;
  }
  .clip-wp{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 11;
    background-color: #000;
    text-align: center;
  #container{
    background-color: #000;
    text-align: center;
    width: 100%;
    left: 0;
    right: 0;
    top: 20px;
    bottom: 80px;
    margin: 0 auto;
    position: absolute;
  }
  #image-box {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    margin: auto;
  }
  #cover-box {
    position: absolute;
    z-index: 9999;
    display: none;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    margin: auto;
  }
  }

  #save-img{
    position: absolute;
    bottom: 20px;
    width: 90%;
    left: 5%;
  }
</style>
