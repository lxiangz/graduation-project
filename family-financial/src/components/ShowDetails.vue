<template>
  <div id="show-details">
    <x-header :left-options="{backText: '帐单明细'}"></x-header>
    <scroller lock-x >
      <!--以时间线显示明细-->
      <div v-for="(item,$index) of details" :key="item.id">
        <group gutter="0">
          <cell :title="item.time" is-link arrow-direction="down" @click.native="openDetails"></cell>
        </group>
          <timeline style="margin:0;padding-bottom: 0px;display:none">
            <timeline-item v-for="(contentItem,$contentIndex) of item.content" :key="contentItem.id">
              <group gutter="0">
                <cell>
                  <div slot="after-title" style="margin-left:5px;height:20px;">
                    <p>{{contentItem.text}}&nbsp;&nbsp;&nbsp;{{contentItem.member}}</p>
                  </div>
                  <icon slot="default" v-if="contentItem.isShow" :id="contentItem.id" @click.native="deleteItem" type="cancel"></icon>
                </cell>
              </group>
            </timeline-item>
          </timeline>
      </div>
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
        isDelete:false,//删除确认框是否显示
        details:[//time 具体天 content 具体天内容  text：记录内容显示 member：记录成员   id：记录id（通过此di删除） isShow：是否显示删除图标
          {time:"2017-05-21", content:[{text:"午餐支出20元",member:"好奇宝宝", id:"21",isShow:true}, {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",isShow:false}]},
          {time:"2017-05-26", content:[ {text:"无数据",member:"", id:"",isShow:false}]},
        ]
      }
    },
    methods:{
      deleteItem(e){
        this.isDelete=true;
        console.log(e.target.id);
      },
      onCancel(){
        this.isDelete=false;
      },
      onConfirm(){

      },
      openDetails(e){
        var div=e.target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling;
        if(div.style.display=="block"){
          div.style.display="none"
        }else{
          div.style.display="block"
        }
      },
      reload(){
        //获取查询条件
        var startDate=this.$store.state.checkStartDate;
        var endDate=this.$store.state.checkEndDate;
        var member=this.$store.state.checkMember;
        var item=this.$store.state.checkItem;
        var itemDetail=this.$store.state.checkItemDetail;
        console.log(startDate);
        console.log(endDate);
        console.log(member);
        console.log(item);
        console.log(itemDetail);
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
     this.reload();

    }
  }
</script>
<style scoped>
  li{
    height:50px;
  }
</style>
