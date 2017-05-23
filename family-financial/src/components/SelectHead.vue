<template>
  <div id="select-head">
    <x-header :left-options="{backText: '选择头像'}"></x-header>
  </div>
</template>
<script type="es6">
  import {XHeader} from 'vux'
  export default{
    data(){
      return{}
    },
    methods:{

    },
    mounted: function () {
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
    },
    components:{
      XHeader
    }
  }
</script>
<style scoped></style>
