<template>
  <div id="check-details">
    <x-header :left-options="{backText: '帐单明细'}"></x-header>
    <group gutter="0">
      <cell title="帐单明细图:" is-link arrow-direction="down"></cell>
    </group>
    <!--柱形图，出错！
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>-->

    <!--以图形显示-->
    <div>
      <img  src="../assets/img/bing.png" />
      <img  src="../assets/img/zhu.png" />
    </div>
    <scroller lock-x height="-245px;">
      <!--以时间线显示明细-->
      <group >
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
     /* var data = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
          {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            data : [65,59,90,81,56,55,40]
          },
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : [28,48,40,19,96,27,100]
          }
        ]
      }
      //Get the context of the canvas element we want to select
      var ctx = document.getElementById("myChart").getContext("2d");
      var barChart = new Chart(ctx).Bar(data, {
        scaleLabel: "$"+"<%=value%>",
        //是否绘制柱状条的边框
        barShowStroke: true,
        //柱状条边框的宽度
        barStrokeWidth: 2,
        //柱状条组之间的间距(过大或过小会出现重叠偏移错位的效果，请控制合理数值)
        barValueSpacing: 5,
        //每组柱状条组中柱状条之间的间距
        barDatasetSpacing: 5,
      });*/
    }
  }
</script>
<style scoped>
  li{
    height:50px;
  }
</style>
