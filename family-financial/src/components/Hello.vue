<template>
  <div>
    <div class="hello">
      <swiper v-model="swiperItemIndex" height="667px" style="width:100%;margin:0 auto;"   dots-class="custom-bottom" dots-position="center">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in demo03_list" :key="index">
          <img :src="item" width="100%" height="667px" />
        </swiper-item>
      </swiper>
    </div>
    <div class="jump">
      <x-button mini plain style="height:28px;width:40px;padding:0;border-radius:45%;inline-height:center;" action-type="button" @click.native="jump" text="跳过"></x-button>
    </div>
  </div>
</template>

<script>
 import Vue from 'vue'
import { Swiper, XButton, SwiperItem } from 'vux'

const imgList = [
  'http://placeholder.qiniudn.com/754x754/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/754x754/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/754x754/8AEEB1/ffffff'
]
const demoList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))
export default {
  components: {
    Swiper,
    XButton,
    SwiperItem
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      demo03_list:imgList,
      swiperItemIndex: 0
    }
  },
  methods:{
    jump(){
      this.$router.push('/home');
    }
  }

}
</script>

<style>
  .jump{
  position:absolute;
  z-index:2;
  top:7px;
  left:327px;
}
</style>
