<template>
  <div id="check-details">
    <x-header :left-options="{backText: '账单明细',preventGoBack:true}"  @on-click-back="back"></x-header>
    <group gutter="0">
      <cell title="帐单明细图" is-link arrow-direction="down" @click.native="show"></cell>
    </group>
    <group gutter="0">
      <cell title="帐单明细" is-link @click.native="showDetails"></cell>
    </group>
    <div id="divider-open" style="height:480px;overflow-y: auto;display: none">
      <divider @click.native="columnDivider">各成员收支情况柱形图(点击展开)</divider>
      <!--柱形图-->
      <div id="column" style="height:250px;width:350px;display:none;margin-top:10px;">

      </div>
      <!--以图形显示-->
      <divider @click.native="pieDivider">收支比例饼状图(点击展开)</divider>
      <div id="pie-data" style="display:none">
        <div id="pie"  style="height:250px;width:285px;float: left">

        </div>
        <div style="float: left;height:250px;width:75px;padding-top: 20px;">
          <group>
            <radio  :options="pieTypeOptions" v-model="pieType" @on-change="changePieType"></radio>
          </group>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="es6">
// import Chart from 'chart.js/src/chart.js';
  import {XHeader,Cell,Group,Timeline, TimelineItem,Scroller,Icon,Confirm,Radio,Divider} from 'vux'
  export default{
    data(){
      return{
        pieType:'支出',//当前饼状图显示的收支类型
        pieTypeOptions:['支出','收入'],//可选择的饼状图显示收支类型
      }
    },
    methods:{
      back(){
        console.log(this.$store.state.detailPage);
        if(this.$store.state.detailPage=="detail"){
          this.$router.push("/detail");
        }else if(this.$store.state.detailPage=="home"){
          this.$router.push("/home");
        }
      },
      show(){
        var dividers=document.getElementById("divider-open");
        if(dividers.style.display=="block"){
          dividers.style.display="none"
        }else{
          dividers.style.display="block"
        }
      },
      showDetails(){
        this.$router.push("/showdetails");
      },
      changePieType(value){
        console.log(value);
        var startDate=this.$store.state.checkStartDate;
        var endDate=this.$store.state.checkEndDate;
        var member=this.$store.state.checkMember;
        var itemDetail=this.$store.state.checkItemDetail;
        this.$instance.post('bill/getPieData',{
          startDay:startDate,
          endDay:endDate,
          member:member,
          type:value,
          typeName:itemDetail
        }).then(function(response){
          if(response.status==200){
            var res=response.data;
            console.log(response);
            if(res.code===200){
              console.log(response);
              pieChart.setOption({
                series : [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius: '65%',
                    grid: {
                      left: '2%',
                      right: '6%',
                      bottom: '3%',
                      top:'13%',
                      containLabel: true
                    },
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
              });
            }else if(res.code===404){
              pieChart.setOption({
                series : [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius: '65%',
                    grid: {
                      left: '2%',
                      right: '6%',
                      bottom: '3%',
                      top:'13%',
                      containLabel: true
                    },
                    roseType: 'angle',
                    data:[
                      {value:100, name:'无数据'},
                    ]
                  }
                ]
              });
            }
          }
        })
          .catch(function(err){
            console.log(err);
          });
      },
      columnDivider(){
        var column=document.getElementById("column");
        if(column.style.display=="block"){
          column.style.display="none"
        }else{
          column.style.display="block"
        }
      },
      pieDivider(){
        var pie=document.getElementById("pie-data");
        if(pie.style.display=="block"){
          pie.style.display="none"
        }else{
          pie.style.display="block"
        }
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
      Radio,
      Divider
    },
    mounted(){
      var _this=this;
      //绘画柱形图
      // 引入 ECharts
      var echarts = require('echarts');
      // 基于准备好的dom，初始化echarts实例
      var columnChart = echarts.init(document.getElementById('column'));
      var pieChart = echarts.init(document.getElementById('pie'));
      //获取查询条件
      var startDate=this.$store.state.checkStartDate;
      var endDate=this.$store.state.checkEndDate;
      var member=this.$store.state.checkMember;
      var item=this.$store.state.checkItem;
      var itemDetail=this.$store.state.checkItemDetail;

      if(item=="支出"){
        this.pieType="支出";
        this.pieTypeOptions=['支出'];
      }
      if(item=="收入"){
        this.pieType="收入";
        this.pieTypeOptions=['收入'];
      }
      if(item=="全部"){
        this.pieType="支出";
        this.pieTypeOptions=['支出','收入'];
      }
      //模拟
      // 绘制柱形图
      columnChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['收入', '支出']
        },
        grid: {
          left: '2%',
          right: '6%',
          bottom: '3%',
          top:'13%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data:["sss","ddd"],
        },
        series: [
          {
            name: '收入',
            type: 'bar',
            data: [50,100],
          },
          {
            name: '支出',
            type: 'bar',
            data:[0,20],
          }
        ]
      });
      pieChart.setOption({
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius: '65%',
            grid: {
              left: '2%',
              right: '6%',
              bottom: '3%',
              top:'13%',
              containLabel: true
            },
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
      });


      //请求数据
     this.$instance.post('bill/getBarData',{
        startDay:startDate,
        endDay:endDate,
        member:member,
       type:item,
        typeName:itemDetail
      }).then(function(response){
        if(response.status==200){
          var res=response.data;
          if(res.code===200){
            columnChart.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['收入', '支出']
              },
              grid: {
                left: '2%',
                right: '6%',
                bottom: '3%',
                top:'13%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
              },
              yAxis: {
                type: 'category',
                data: res.username,
              },
              series: [
                {
                  name: '收入',
                  type: 'bar',
                  data: res.incomes,
                },
                {
                  name: '支出',
                  type: 'bar',
                  data: res.pays,
                }
              ]
            });//将请求到的数据绘制柱形图
          }else if(res.code===404){}
        }
      })
        .catch(function(err){
          console.log(err);
        });
      this.$instance.post('bill/getPieData',{
        startDay:startDate,
        endDay:endDate,
        member:member,
        type:item,
        typeName:itemDetail
      }).then(function(response){
        if(response.status==200){
          var res=response.data;
          console.log(response);
          if(res.code===200){
            console.log(res);
            pieChart.setOption({
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '65%',
                  grid: {
                    left: '2%',
                    right: '6%',
                    bottom: '3%',
                    top:'13%',
                    containLabel: true
                  },
                  roseType: 'angle',
                  data:res.data
                }
              ]
            });//有数据时直接根据数据绘制
          }else if(res.code===404){
            pieChart.setOption({
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '65%',
                  grid: {
                    left: '2%',
                    right: '6%',
                    bottom: '3%',
                    top:'13%',
                    containLabel: true
                  },
                  roseType: 'angle',
                  data:[
                    {value:100, name:'无数据'},
                  ]
                }
              ]
            });//无数据时显示无数据
          }
        }
      })
        .catch(function(err){
          console.log(err);
        });
      plus.key.removeEventListener("backbutton",function(){
        console.log("remove");
      });
      plus.key.addEventListener("backbutton",function(){
        _this.back();
      });
    }
  }
</script>
<style scoped>
  li{
    height:50px;
  }
</style>
