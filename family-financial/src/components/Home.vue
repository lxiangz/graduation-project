<template>
  <div class="hello">
    <flexbox orient="vertical" :gutter="0">
    <flexbox-item>
      <div class="flex-demo upper">
        <flexbox class="flexbox-row">
          <flexbox-item :span="7/12"><div><span style="color:red;font-size:30px;">4</span>/2017</div></flexbox-item>
          <flexbox-item :span="1/9">
            <div>
              <x-icon type="ios-help-outline" style="padding:7px 0 0 10px;" size="25"></x-icon>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/9"><div><img width="25px" style="padding:10px 0 0 10px;" src="../assets/img/icon_nav_cell.png"/></div></flexbox-item>
        </flexbox>
        <group gutter="0" style="background-image:url('../assets/img/greenbg.jpg')" >
          <cell title="本月收入" value="0.00" is-link></cell>
          <cell title="本月支出" value="0.00" is-link></cell>
          <cell title="预算余额" value="未设预算，点此设置" is-link></cell>
        </group>
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo record ">
        <box gap="1px 20px">
          <x-button type="primary" action-type="button" @click.native="record">记一笔</x-button>
        </box>
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="flex-demo">
        <group gutter="0">
        <cell title="今天" inline-desc="还没有记过账"  value="0.00" is-link>
          <img slot="icon" width="35px" style="display:block; margin-right:5px;" src="../assets/img/icon_nav_msg.png" />
          <div slot="default">
            <span style="color:red">0.00</span><br/>
            <span style="color:green">0.00</span>
          </div>
        </cell>
        <cell title="本周" inline-desc="04月10号-04月16号"  value="0.00" is-link>
          <img slot="icon" width="35px" style="display:block; margin-right:5px;" src="../assets/img/icon_nav_button.png" />
          <div slot="default">
            <span style="color:red">0.00</span><br/>
            <span style="color:green">0.00</span>
          </div>
        </cell>
        <cell title="本月" inline-desc="04月01号-04月30号"  value="0.00" is-link>
          <img slot="icon" width="35px" style="display:block; margin-right:5px;" src="../assets/img/icon_nav_msg.png" />
          <div slot="default">
            <span style="color:red">0.00</span><br/>
            <span style="color:green">0.00</span>
          </div>
        </cell>
        <cell title="社区" inline-desc="跟大神一起学记账"  is-link>
          <img slot="icon" width="35px" style="display:block; margin-right:5px;" src="../assets/img/icon_nav_button.png" />
          <div slot="default">
            <span style="color:orange">福利活动</span>
          </div>
        </cell>
        </group>
      </div>
    </flexbox-item>
    </flexbox>
    <tabbar>
      <tabbar-item>
        <div slot="icon"><x-icon type="ios-arrow-left" size="25"></x-icon></div>
          <span slot="label">我的</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/img/icon_nav_button.png">
          <span slot="label">明细</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="../assets/img/icon_nav_msg.png">
          <span slot="label">账户</span>
      </tabbar-item>
      <tabbar-item selected link="/component/demo">
        <img slot="icon" src="../assets/img/icon_nav_article.png">
          <span slot="label">报表</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon" src="../assets/img/icon_nav_cell.png">
          <span slot="label">理财</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>

import { Flexbox, FlexboxItem,Cell,Group,XButton,Box,Tabbar, TabbarItem,Badge} from 'vux'

export default {
  name: 'hello',
  data () {
    return {

    }
  },
  methods:{
    record(){
      this.$router.push('/record');
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    Cell,
    Group,
    XButton,
    Box,
    Tabbar,
    TabbarItem,
    Badge
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .weui-cell{
  padding:10px 30px;
}
.upper{
  padding-bottom:20px;
  background-image:url("../assets/img/greenbg.jpg")

}
.flex-demo {
  height:auto;
  background-clip: padding-box;
}
.flexbox-row{
  padding:10px 30px;
}
.record{
  padding:10px 0;
}
</style>
