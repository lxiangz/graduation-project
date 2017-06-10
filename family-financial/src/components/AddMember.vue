<template>
  <div id="add-member">
    <x-header :left-options="{backText: '关联账号'}"></x-header>
    <group gutter="0">
      <x-input type="tel" required placeholder=" 输入关联手机号"  v-model="cellphone" >
        <img  slot="label" src="../assets/img/cellphone.png" />
        <x-button slot="right" mini type="default" action-type="button" :disabled="isGetCode" style="padding:0 7px;height:30px" @click.native="getCode" >{{getCodeText}}</x-button>
      </x-input>
      <x-input  v-model="testCode" required placeholder=" 请输入验证码">
        <img  slot="label" width="25px" src="../assets/img/test_code.png" />
      </x-input>
    </group>

    <box gap="15px 20px">
      <x-button type="primary" action-type="button" @click.native="confirm">确定</x-button>
    </box>
    <div class="blank">&nbsp;</div>
    <group gutter="0">
      <cell title="已关联账号："></cell>
    </group>
    <!--显示已关联账号信息-->
    <div style="width:100%">
      <box class="related-account" id="related-members">
        <div class="little-container"  v-for="(item,$index) of members" :key="item.id" @click="selectedMember($index)" :id="item.id">
          <a>
            <img  src="../assets/img/icon_nav_msg.png" />
            <span>{{item.username}}</span>
          </a>
        </div>
      </box>
      <span style="margin-left:140px;display:none;margin-bottom:10px;" id="no-cancer-text">无关联账号</span>
      <x-button style="width:345px;" type="primary" action-type="button" @click.native="cancer">取消关联</x-button>
    </div>
    <!--显示警告信息-->
    <toast v-model="toastShow" width="9.5em" :type="toastType"  position="top">
      <span slot="default">{{toastText}}</span>
    </toast>
  </div>
</template>
<script type="es6">
  import {XHeader,Cell,Group,Box,XButton,XInput,Toast} from 'vux'
 const code="";
export default{
  data(){
    return{
      cellphone:"",
      testCode:"",
      getCodeText:"获取验证码",
      isGetCode:false,
      toastShow:false,
      toastType:"warn",
      toastText:"",
      cancerId:"",//取消关联id
      members:[]
    }
  },
  methods:{
    setClickAgain(){
      this.isGetCode=true;
      var time=60;
      var _this=this;
      //每一秒改变按钮text
      var setText = window.setInterval(function () {
        _this.getCodeText=(time--).toString()+"秒后可重新发送";
        //去掉定时器的方法
        if(time==-1){
          _this.isGetCode=false;
          _this.getCodeText="获取验证码";
          window.clearInterval(setText);
        }
      },1000);
    },
    getCode(){
      var _this=this;
      //验证是否为空
      if(this.cellphone===""){
        this.toastShow=true;
        this.toastText="手机号不能为空";
        this.toastType="warn";
      }else{
        //验证手机号吗格式是否正确
        var tel =/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
        var re = new RegExp(tel);
        if (re.test(this.cellphone)) {
          //验证该手机账号是否存在过
         // this.$store.commit('confirmPhone',this.cellphone);
            this.$instance.post(
              'user/testPhone',{
                phone:_this.cellphone
              })
              .then(function(response){
                console.log(response);
                if(response.status==200){
                  var res=response.data;
                  if(res.code==404){
                    _this.toastShow=true;
                    _this.toastText="该手机号未注册过";
                    _this.toastType="warn";
                  }else{
                    //一分钟后可再次点击获取验证码按钮
                    _this.setClickAgain();
                    //获得验证码
                   // this.$store.commit('getTestCode',this.cellphone);
                    _this.$instance.post(
                      'user/sendSMS',{
                        "phone":_this.cellphone
                      })
                      .then(function(response){
                        console.log(response);
                        if(response.status==200){
                          var res=response.data;
                          if(res.code===200){
                           _this.code=res.message;
                          }else if(res.code===400){
                            _this.toastShow=true;
                            _this.toastText="验证码发送失败";
                            _this.toastType="warn";
                          }
                        }else{
                          _this.toastShow=true;
                          _this.toastText="验证码发送失败";
                          _this.toastType="warn";
                        }
                      })
                      .catch(function(err){
                        console.log(err);
                      });
                  }
                }
              })
              .catch(function(err){
                console.log(err);
              });
        }else{
          this.toastShow=true;
          this.toastText="手机号格式错误！";
          this.toastType="warn";
        }
      }
    },
    confirm(){
      var _this=this;
      //验证码不为空，且正确
      if(this.testCode==""){
        this.toastShow=true;
        this.toastText="验证码不能为空！";
      }else{
        if(this.testCode==this.code){
          //发送请求关联手机号
          this.$instance.post(
            'share/associated ',{
              "phone":_this.cellphone,
              "code":_this.testCode
            })
            .then(function(response){
              console.log(response);
              if(response.status==200){
                var res=response.data;
                if(res.code===200){
                  //提示关联成功
                  _this.toastShow=true;
                  _this.toastText="关联成功";
                  _this.toastType="default";
                  _this.code="";
                  _this.testCode="";
                  //下面的关联的手机号更新
                  _this.reload();
                }else if(res.code===404){
                  _this.toastShow=true;
                  _this.toastText=res.message;
                  _this.toastType="warn";
                  _this.testCode="";
                }
              }
            })
            .catch(function(err){
              console.log(err);
            });

        }else{
          this.toastShow=true;
          this.toastText="验证码错误！";
          this.toastType="warn";
        }
      }
    },
    //选择关联成员
  selectedMember(index){
    var divs=document.getElementById("related-members").getElementsByTagName("div")
    for(var i=0;i<divs.length;i++){
      divs[i].className="little-container";
    }
    document.getElementById(this.members[index].id).className="little-container select"

    this.cancerId=this.members[index].id;
    console.log( this.cancerId);
  },
    //显示关联手机号
    reload(){
      var _this=this;
      console.log("sss")
      //发送请求获得数据
      this.$instance.get('share/getAssociated').then(function(response){
        if(response.status==200){
          var res=response.data;
          console.log(res);
          if(res.code===200){
           _this.members.splice(0,_this.members.length);
            if(res.list.length>0){
              for(var i=res.list.length-1;i>=0;i--){
                _this.members.unshift(res.list[i])
              }
              document.getElementById("no-cancer-text").style.display="none";
            }else{
              document.getElementById("no-cancer-text").style.display="block";
            }
            console.log(_this.members);
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
    },

    //取消关联
    cancer(){
      var _this=this;
      if(this.cancerId==""){
        this.toastShow=true;
        this.toastText="请选择一个需要取消关联的成员！";
        this.toastType="warn";
      }else{
        this.$instance.post('share/deleteAssociated',{
            id:_this.cancerId
          }
        ).then(function(response){
          if(response.status==200){
            var res=response.data;
            console.log(response);
            if(res.code===200){
              _this.toastShow=true;
              _this.toastText="取消关联成功！";
              _this.toastType="default";
             _this.reload();
            }else if(res.code===404){
              _this.toastShow=true;
              _this.toastText=res.message;
              _this.toastType="warn";
            }
          }
        })
          .catch(function(err){
            console.log(err);
          });
      }
    }
  },
  mounted:function(){
    //第一个输入框取得焦点
    var inputs = document.getElementById('add-member').getElementsByTagName('input');
    inputs[0].focus();
    this.reload();
  },
  components:{
    XHeader,
    Cell,
    Group,
    Box,
    XButton,
    XInput,
    Toast
  }
}
</script>
<style scoped>
  .blank{
    height:13px;
    background-color:	#DCDCDC;
  }
  /*关联账号*/
  .related-account{
    margin:10px 0 0 10px;
  }
  .related-account .little-container{
    float:left;
    margin:0 5px 10px 0;
  }
  .related-account .little-container img{
    display:block;
    border-radius:50%;
    border:1px solid #DCDCDC;
  }
  .related-account .little-container span{
    font-size:13px;
    color:gray;
    display:block;
  }
  .related-account .select span{
    color:green;
  }
  .related-account .select img{
    color:green;
    border:1px solid green;
  }
/*  img{
    border-radius:50%;
    border:1px solid #DCDCDC;
  }*/
</style>
