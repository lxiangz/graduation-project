<template>
  <div id="detail">
    <x-header :left-options="{backText: '查询帐单明细'}"></x-header>
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
  </div>
</template>
<script type="es6">
  import {XHeader,Calendar,Group,Cell,Picker,Box,XButton} from 'vux'
  export default {
    data(){
      return{
        startDate:"",
        endDate:"",
        //成员
        selectedMember:"家庭公共",
        member:[""],
        members:[['家庭公共', '好奇宝宝', '全部']],
        isSelectMem:false,
        //收支类型
        selectedItem:"全部",
        item:[],
        items:[['全部', '收入', '支出']],
        isSelectItem:false,
        //收支项目
        selectedItemDetails:"全部",
        isSelectItemDetails:false,

      }
    },
    components:{
      XHeader,
      Calendar,
      Group,
      Cell,
      Picker,
      Box,
      XButton
    },
    methods:{
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
         this.$router.push("/incomemore");
        }
        if(this.selectedItem=="支出"){
          this.$router.push("/paymore");
        }
      },
      check(){
        this.$router.push("/checkdetails");
      }
    }
  }
</script>
<style scoped>

</style>
