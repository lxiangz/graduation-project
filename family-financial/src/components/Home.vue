<template>
  <div>
    <div class="vux-demo">
      <group-title>自动轮播</group-title>
      <swiper :list="demo03_list" auto style="width:80%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
    </div>
    <group title="cell demo">
      <cell title="Vux" value="Cool" is-link :link="{path:'/hello'}" ></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Swiper } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'my app!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
