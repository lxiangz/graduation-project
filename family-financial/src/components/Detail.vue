<template>
  <div id="detail">
    <x-header :left-options="{backText: '查询帐单明细',preventGoBack:true}"  @on-click-back="back"></x-header>
    <group >
      <calendar title="选择开始时期" v-model="startDate" disable-future></calendar>
    </group>
      <group > <calendar title="选择结束时期" disable-future v-model="endDate"></calendar></group>
     <group>
      <cell title="选择成员" :value="selectedMember" is-link @click.native="selectMem"></cell>
    </group>
    <picker v-if="isSelectMem" :data='members' v-model='member' @on-change='memberChange'></picker>
    <group>
      <cell title="选择收支类型" :value="selectedItem" is-link @click.native="selectItem"></cell>
    </group>
    <picker v-if="isSelectItem" :data='items' v-model='item' @on-change='itemChange'></picker>
    <group>
      <cell title="选择收支项目" :value="selectedItemDetails" is-link @click.native="selectDetails"></cell>
    </group>
    <box gap="25px 20px">
      <x-button type="primary" action-type="button" @click.native="check">查询</x-button>
    </box>
    <!--显示警告信息-->
    <toast v-model="toastShow" width="11em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
  </div>
</template>
<script type="es6">
  import {XHeader,Calendar,Group,Cell,Picker,Box,XButton,Toast} from 'vux'
  export default {
    data(){
      return{
        startDate:"",//开始日期
        endDate:"",//结束日期
        selectedMember:"全部",//当前显示成员
        member:[""],//当前选中成员
        members:[[]],//可选择的成员列表
        isSelectMem:false,//是否显示选择成员列表
        selectedItem:"全部",//当前显示收支类型
        item:[],//当前选择的收支类型
        items:[['全部', '收入', '支出']],//可选择的收支类型成员表
        isSelectItem:false,//是否显示选择收支类型列表
        selectedItemDetails:"全部",//当前显示收支项目
        //警告信息
        toastShow:false,
        toastType:"warn",
        toastText:"",

      }
    },
    components:{
      XHeader,
      Calendar,
      Group,
      Cell,
      Picker,
      Box,
      XButton,
      Toast
    },
    methods:{
      back(){
        this.$store.commit("detailDate");
        this.$router.push("/home");
      },
      selectMem(){
        if(this.isSelectMem){
          this.isSelectMem=false;
        }else{
          this.isSelectMem=true;
        }
      },
      memberChange(){
        this.selectedMember=this.member[0];
      },
      selectItem(){
        if(this.isSelectItem){
          this.isSelectItem=false;
        }else{
          this.isSelectItem=true;
        }
      },
      itemChange(){
        this.selectedItem=this.item[0];
      },
      selectDetails(){
        if(this.selectedItem=="收入"){
          this.$store.commit("changePage","detail");
          this.$store.commit("saveDetailData",{
            startDate:this.startDate,
            endDate:this.endDate,
            selectedMember:this.selectedMember,
            selectedItem:this.selectedItem
          })
         this.$router.push("/incomemore");
        }
        if(this.selectedItem=="支出"){
          this.$store.commit("changePage","detail");
          this.$store.commit("saveDetailData",{
            startDate:this.startDate,
            endDate:this.endDate,
            selectedMember:this.selectedMember,
            selectedItem:this.selectedItem
          })
          this.$router.push("/paymore");
        }
      },
      check(){
        //输出查询条件
        //保存查询条件
        this.$store.commit("saveCheckOptions",{
          checkStartDate:this.startDate,
          checkEndDate:this.endDate,
          checkMember:this.selectedMember,
          checkItem:this.selectedItem,
          checkItemDetail:this.selectedItemDetails,
        });
        if(this.startDate!=""&&this.endDate!=""){
          var startDate=new Date(this.startDate);
          var endDate=new Date(this.endDate);
          if(endDate<startDate){
            console.log(endDate<startDate);
            this.toastShow=true;
            this.toastText="结束日期必须大于开始日期！";
          }
        }
        console.log(this.startDate);
        console.log(this.endDate);
        console.log(this.selectedMember);
        console.log(this.selectedItem);
        console.log(this.selectedItemDetails);
        this.$store.commit("changeDetailPage","detail")
        this.$router.push("/checkdetails");
      },
      //获得昵称
      getMembers(){
        var _this=this;
        this.$instance.get('user/getUser').then(function(response){
          if(response.status==200){
            var res=response.data;
            if(res.code===200){
              _this.members[0].splice(0,_this.members[0].length);
              _this.selectedMember="全部";
              _this.members[0].push("全部","家庭公共",res.user.username)
              //获得所有关联的成员昵称
              _this.$instance.get('share/getAssociated').then(function(response){
                if(response.status==200){
                  var res=response.data;
                  if(res.code===200){
                    for(var i=0;i<res.list.length;i++){
                      _this.members[0].push(res.list[i].username)
                    }
                    //console.log(document.getElementById(res.list[0].id))
                    //document.getElementById(res.list[0].id).className="little-container select";
                    //_this.cancaerId=res.list[0].id;
                    //console.log(_this.members);
                  }else if(res.code===404){
                  }
                }
              })
                .catch(function(err){
                  console.log(err);
                });
            }else if(res.code===400){
              console.log(res.message);
            }
          }
        })
          .catch(function(err){
            console.log(err);
          });
      },
      //滑动事件添加
      load(){
        var _this=this;
        var startX,startY,moveEndX,moveEndY,X,Y;
        document.addEventListener('touchstart',touch, false);
        document.addEventListener('touchmove',touch, false);
        document.addEventListener('touchend',touch, false);
        function touch (event){
          var event = event || window.event;
          switch(event.type){
            case "touchstart":
              startX=event.touches[0].clientX;
              startY=event.touches[0].clientY;
              break;
            case "touchmove":
              break;
            case "touchend":
              moveEndX=event.changedTouches[0].clientX;
              moveEndY=event.changedTouches[0].clientY
              X=moveEndX-startX;
              Y=moveEndY-startY;
              if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
                _this.$router.push("/personal");
              }
              else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
                _this.$router.push("/home");
              }
              else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                //console.log("top 2 bottom");
              }
              else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                //console.log("bottom 2 top");
              }
              else{
                //console.log("just touch");
              }
              break;
          }
        }
      }
    },
    mounted:function(){
      var _this=this;
     this.getMembers();
      //获取查询状态
      this.selectedItemDetails=this.$store.state.detailSelectedItem;
      if(this.startDate==""){
        this.startDate=this.$store.state.todayDate
      }else{
        this.startDate=this.$store.state.startDate;
      }
      if(this.endDate==""){
        this.endDate=this.$store.state.todayDate
      }else{
        this.endDate=this.$store.state.endDate;
      }
      this.selectedMember=this.$store.state.selectedMember;
      this.selectedItem=this.$store.state.selectedItem;


      //页面滑动
      //window.addEventListener('load',this.load(), false);
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

</style>
