<template>
  <div id="template">
   <!--利用vux组件编写页面设计代码，包含绑定各组件属性变量，设置响应事件，实现双向响应-->
  </div>
</template>
<!--编写页面脚本，包含导入插件，初始化、更新组件属相变量，利用vue页面生命周期进行逻辑开发，实现事件方法-->
<script type="es6">
  import hex_md5 from '../assets/js/md5.js'//按需导入使用到的方法
  import {Group,XInput,XHeader,XImg,XButton,Box,Toast } from 'vux'//按需导入vux-组件
  export default{
    data(){
      return {} //初始化页面涉及到的变量以及组件属性绑定变量
    },
    methods: {}, //编写js脚本实现事件方法
    mounted: function () {},//利用vue生命周期中的mounted设置在页面数据加载前的操作
    components: {Group, XInput, XHeader, XImg, XButton, Box, Toas} //利用的vux组件
  }
</script>
<style scoped>
  /* scoped表示只作用于当前特面 */
  /* 编写页面自定义样式 */
</style>
