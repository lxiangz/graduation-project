<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="es6">

 //通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
import store from './store/store.js'
export default {
  data(){
    return{}
  },
  store
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
