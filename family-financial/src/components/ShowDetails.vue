<template>
  <div id="show-details"  >
    <x-header :left-options="{backText: '账单明细',preventGoBack:true}"  @on-click-back="back"></x-header>
      <!--以时间线显示明细，div滚动条-->
    <div style="height:550px; overflow-y:auto">
      <div v-for="(item,$index) of details" :key="item.id" >
        <group gutter="0">
          <cell :title="item.time" is-link arrow-direction="down" @click.native="openDetails"></cell>
        </group>
        <timeline style="margin:0;padding-bottom: 0px;display:none">
          <timeline-item v-for="(contentItem,$contentIndex) of item.contents" :key="contentItem.id">
            <group gutter="0">
              <cell>
                <div slot="after-title" style="margin-left:5px;height:40px;">
                  <p>{{contentItem.text}}&nbsp;&nbsp;&nbsp;{{contentItem.member}}</p>
                  <p style="padding-top:3px;color:grey;font-size: 13px;;">备注：{{contentItem.remark}}</p>
                </div>
                <icon slot="default" v-if="contentItem.show" :id="contentItem.id" @click.native="deleteItem" type="cancel"></icon>
              </cell>
            </group>
          </timeline-item>
        </timeline>
      </div>
    </div>

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
  import {XHeader,Cell,Group,Timeline, TimelineItem,Icon,Confirm} from 'vux'
  export default{
    data(){
      return{
        isDelete:false,//删除确认框是否显示
        details:[//time 具体天 content 具体天内容  text：记录内容显示 member：记录成员   id：记录id（通过此di删除） isShow：是否显示删除图标
          {time:"2017-05-21", contents:[{text:"午餐支出20元",member:"好奇宝宝", id:"21",show:true}, {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},
            {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false}]},
          {time:"2017-05-21", contents:[{text:"午餐支出20元",member:"好奇宝宝", id:"21",show:true}, {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},
            {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false}]},
          {time:"2017-05-21", contents:[{text:"午餐支出20元",member:"好奇宝宝", id:"21",show:true}, {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},
            {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false}]},
          {time:"2017-05-21", contents:[{text:"午餐支出20元",member:"好奇宝宝", id:"21",show:true}, {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},{text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false},
            {text:"工资薪水收入2000元",member:"家庭公共", id:"2f",show:false}]},
          {time:"2017-05-26", contents:[ {text:"无数据",member:"", id:"",show:false}]},
        ],
        deleteId:"",
      }
    },
    methods:{
      back(){
        this.$router.push("/checkdetails");
      },
      deleteItem(e){
        this.isDelete=true;
        this.deleteId=e.target.id;
        console.log(e.target.id);
      },
      onCancel(){
        this.isDelete=false;
      },
      onConfirm(){
        var _this=this;
        this.$instance.post('bill/deleteBill ',{
         id:_this.deleteId
        }).then(function(response){
          if(response.status==200){
            console.log(response);
            var res=response.data;
            console.log(res);
            if(res.code===200){
              console.log("删除成功");
              _this.isDelete=false;
              _this.reload();
            }else if(res.code===404){}
          }
        })
          .catch(function(err){
            console.log(err);
          });
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
        var _this=this;
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
        //请求数据
        this.$instance.post('bill/getBills',{
          startDay:startDate,
          endDay:endDate,
          member:member,
          type:item,
          typeName:itemDetail
        }).then(function(response){
          if(response.status==200){
            console.log(response);
            var res=response.data;
            console.log(res);
            if(res.code===200){
              if(res.list.length>0){
                _this.details=res.list;
              }else{
                _this.details=[
                  {time:startDate+"至"+endDate, contents:[ {text:"无数据",member:"", id:"",show:false}]},
                ];
              }

            }else if(res.code===404){}
          }
        })
          .catch(function(err){
            console.log(err);
          });
      }
    },
    components:{
      XHeader,
      Cell,
      Group,
      Timeline,
      TimelineItem,
      Icon,
      Confirm
    },
    mounted(){
      //获取查询条件
     this.reload();
      var _this=this;
      plus.key.addEventListener("backbutton",function(){
        _this.back();
      });

    }
  }
</script>
<style scoped>
  li{
    height:68px;
  }
</style>
