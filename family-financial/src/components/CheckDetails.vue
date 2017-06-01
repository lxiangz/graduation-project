<template>
  <div id="check-details">
    <x-header :left-options="{backText: '帐单明细'}"></x-header>
    <group gutter="0">
      <cell title="帐单明细图" is-link arrow-direction="down" @click.native="show"></cell>
    </group>
    <group gutter="0">
      <cell title="帐单明细" is-link @click.native="showDetails"></cell>
    </group>
      <!--柱形图-->
      <div id="column" style="height:250px;width:375px;display:none">

      </div>
      <!--以图形显示-->
      <div id="pie" style="height:250px;width:375px;display:none">

      </div>




  </div>
</template>
<script type="es6">
// import Chart from 'chart.js/src/chart.js';
  import {XHeader,Cell,Group,Timeline, TimelineItem,Scroller,Icon,Confirm} from 'vux'
  export default{
    data(){
      return{

      }
    },
    methods:{
      show(){
        var column=document.getElementById("column");
        var pie=document.getElementById("pie");
        if(column.style.display=="block"){
          column.style.display="none"
        }else{
          column.style.display="block"
        }
        if(pie.style.display=="block"){
          pie.style.display="none"
        }else{
          pie.style.display="block"
        }
      },
      showDetails(){
        this.$router.push("/showdetails");
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
      Confirm,
    },
    mounted(){
      //获取查询条件

      //绘画柱形图
      // 引入 ECharts 主模块
      var echarts = require('echarts/lib/echarts');
// 引入柱状图
      require('echarts/lib/chart/bar');
      require('echarts/lib/chart/pie');
// 引入提示框和标题组件
      require('echarts/lib/component/tooltip');
      require('echarts/lib/component/title');

// 基于准备好的dom，初始化echarts实例
      var columnChart = echarts.init(document.getElementById('column'));
// 绘制图表
      columnChart.setOption({
        xAxis: {
          data: ['餐饮', '交通', '购物', '娱乐', '医教', '居家']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [50, 200, 306, 100, 100, 200]
        }]
      });

      var pieChart = echarts.init(document.getElementById('pie'));
      pieChart.setOption({
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius: '65%',
            roseType: 'angle',
            data:[
              {value:235, name:'餐饮'},
              {value:274, name:'交通'},
              {value:310, name:'购物'},
              {value:0, name:'人情0'},
              {value:335, name:'娱乐'},
              {value:200, name:'医教'},
              {value:400, name:'居家'},
              {value:0, name:'投资0'},
              {value:400, name:'生意'}
            ]
          }
        ]
      })
    }
  }
</script>
<style scoped>
  li{
    height:50px;
  }
</style>
