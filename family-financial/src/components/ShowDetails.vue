<template>
  <div id="show-details">
    <x-header :left-options="{backText: '帐单明细'}"></x-header>
    <scroller lock-x height="-245px;">
      <!--以时间线显示明细-->
      <group gutter="0" >
        <cell title="2017-05-20" is-link></cell>
      </group>

      <group gutter="0">
        <cell title="2017-05-21" is-link arrow-direction="down"></cell>
      </group>
      <div>
        <timeline style="margin:0;padding-bottom: 0px;">
          <timeline-item>
            <group gutter="0">
              <cell>
                <div slot="after-title" style="margin-left:5px;height:20px;">
                  <p>午餐支出20元 好奇宝宝</p>
                </div>
                <icon slot="default" @click.native="deleteItem" type="cancel"></icon>
              </cell>
            </group>
          </timeline-item>
          <timeline-item>
            <group gutter="0">
              <cell>
                <div slot="after-title" style="margin-left:5px;height:20px;">
                  <p>晚餐支出20元  好奇宝宝</p>
                </div>
                <icon slot="default" type="cancel"></icon>
              </cell>
            </group>
          </timeline-item>
          <timeline-item>
            <group gutter="0">
              <cell>
                <div slot="after-title" style="margin-left:5px;height:20px;">
                  <p>水果支出20元 家庭公共</p>
                </div>
                <icon slot="default" type="cancel"></icon>
              </cell>
            </group>
          </timeline-item>
        </timeline>
      </div>
      <group gutter="0">
        <cell title="2017-05-22" is-link ></cell>
      </group>
      <group gutter="0">
        <cell title="2017-05-23" is-link></cell>
      </group>
      <group gutter="0">
        <cell title="2017-05-21" is-link ></cell>
      </group>
    </scroller>
    <confirm v-model="isDelete"
             title=""
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
      >
      <div slot="default">
        <icon type="safe_warn" is-msg></icon><br><br>
        <span style="font-size:18px;">确定删除该条记录吗？</span>
      </div>
    </confirm>
  </div>
</template>
<script type="es6">
// import Chart from 'chart.js/src/chart.js';
  import {XHeader,Cell,Group,Timeline, TimelineItem,Scroller,Icon,Confirm} from 'vux'
  export default{
    data(){
      return{
        isDelete:false,
      }
    },
    methods:{
      deleteItem(){
        this.isDelete=true;
      },
      onCancel(){
        this.isDelete=false;
      },
      onConfirm(){

      }
    },
    components:{
      XHeader,
      Cell,
      Group,
      Timeline,
      TimelineItem,
      Scroller,
      Icon,
      Confirm
    },
    mounted(){
      //获取查询条件


    }
  }
</script>
<style scoped>
  li{
    height:50px;
  }
</style>
