<template>
  <div class="visitor">
    <!-- 头部 -->
    <div class="visitor_top">
      <div class="logo_img">
        <img class="logo" src="../assets/img/logo.png" alt="">
      </div>
      <div class="company_name">{{company}}欢迎你</div>
    </div>
    <!-- 表单 -->
    <div class="forms">
      <div class="tit">
        <img src="../assets/img/title_icon.png" alt="">
        访客信息
      </div>
      <myform ref="myforma" :formData="formData" :reform="reforma"></myform>
    </div>
    <div class="forms">
      <div class="tit">
        <img src="../assets/img/title_icon.png" alt="">
        被访人信息<span>注: 手机号和邮箱请至少填写其中一项</span>
      </div>
      <myform ref="myformb" :formData="formDataB" :reform="reformb"></myform>
    </div>
    <div class="agree">
      <el-radio v-model="radio" label="2">我同意</el-radio>
      <span> 柔宇保密协议条款</span>
    </div>
    <div class="btn">提交信息</div>
  </div>
</template>
<script>
export default {
  name: 'visitor',
  data () {
    return {
      company: '柔宇科技',
      reforma: 'reforma',
      reformb: 'reformb',
      radio: '',
      formDataB: [
        {
          type: 'input',
          field: 'schoolName',
          name: '姓名：',
          divwidth: '30%',
          value: ''
        },
        {
          type: 'input',
          field: 'phone',
          name: '手机：',
          divwidth: '30%',
          value: ''
        },
        {
          type: 'input',
          field: 'schoolCode',
          name: '邮箱：',
          divwidth: '40%',
          value: ''
        }
      ],
      formData: [
        {
          type: 'input',
          field: 'schoolName',
          name: '姓名：',
          divwidth: '30%',
          value: ''
        },
        {
          type: 'input',
          field: 'phone',
          name: '手机：',
          divwidth: '30%',
          value: ''
        },
        {
          type: 'input',
          field: 'schoolCode',
          name: '单位：',
          divwidth: '40%',
          value: ''
        },
        {
          type: 'input',
          field: 'remark',
          name: '携带物品：',
          divwidth: '100%',
          value: ''
        },
        {
          type: 'radio',
          field: 'address',
          name: '来访目的：',
          divwidth: '100%',
          options: [
            {
              label: '商务合作',
              value: 0
            },
            {
              label: '参观',
              value: 1
            },
            {
              label: '面试',
              value: 2
            },
            {
              label: '维修',
              value: 3
            },
            {
              label: '其它',
              value: 4
            }
          ],
          value: ''
        },
        {
          type: 'radio',
          field: 'address',
          name: '来访类型：',
          options: [
            {
              label: '个人',
              value: 0
            },
            {
              label: '企业',
              value: 1
            }
          ],
          value: ''
        },
        {
          type: 'select',
          field: 'address',
          name: '人数：',
          options: [
            {
              label: '5人以下',
              value: 1
            },
            {
              label: '5~10人',
              value: 2
            },
            {
              label: '10~20人',
              value: 4
            },
            {
              label: '20~50人',
              value: 3
            },
            {
              label: '50人以上',
              value: 5
            }
          ],
          value: ''
        }
      ]
    }
  }
}
</script>
<style scoped>
  .visitor {
    width: 100%;
    height: 100%;
    background: url('../assets/img/bg.png')
  }

  .visitor_top {
    width: 100%;
    height: 79px;
    line-height: 79px;
    background: rgba(244, 247, 248, 0);
    display: flex;
    justify-content: center;
  }

  .logo {
    line-height: 79px;
    width: 145px;
    height: 25px;
    vertical-align: middle;
    margin: 0 10px 0 20px;
  }

  .company_name {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 124, 186, 1);
  }

  .forms {
    width: 620px;
    background: #ffffff;
    margin: 0 auto;
    padding: 40px;
    margin-bottom: 15px;
  }

  .tit {
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(0, 124, 186, 1);
    /* text-align: left; */
    display: flex;
    line-height: 15px;
    margin-bottom: 22px;
  }

  .tit img {
    width: 4px;
    height: 15px;
    margin-right: 5px;
  }
  .tit span{
    font-size:12px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(171,177,179,1);
margin-left: 10px;
  }
  .btn{
    width:250px;
height:50px;
background:rgba(0,124,186,1);
border-radius:24px;
margin: 0 auto;
font-size:18px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
line-height: 50px;
  }
</style>
