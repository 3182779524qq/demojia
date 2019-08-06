<template>
  <div class="issure_system">
    <div class="query_header">
      <!-- <tableHead title="添加客服账号" :btnList="btnList" @headClack="headClack"></tableHead> -->
    </div>
    <div class="my_form">
      <myform ref="myform" :formData="formDataD" reform="reform"></myform>
      <div class="up_load">
        <div class="text">上传头像：</div>
        <div class="up_btn">
          <!-- <qiniu></qiniu>-->
          <!-- <elup ref="imgUrl"></elup> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      sucInfo: null,
      imageUrl: '',
      btnList: [{
        text: '创建',
        type: 'save',
        color: 'empty'
      }],
      formDataD: [{
        type: 'input', // 普通输入框
        field: 'name',
        name: '姓名：',
        value: ''
      },
      {
        type: 'input', // 普通输入框
        field: 'jobNumber',
        name: '工号：',
        value: ''
      },
      {
        type: 'input', // 普通输入框
        field: 'phone',
        name: '电话：',
        value: ''
      },
      // {
      //     type: "select", //普通输入框
      //     field: "city",
      //     name: "城市：",
      //     packet: 1,
      //     filterable: true, //可搜索
      //     multiple: false, //多选
      //     divwidth: '33.33%',
      //     options: [],
      //     ajax: {
      //         url: this.$url.getCity, //url地址
      //         data: {}, //参数
      //         // method: 'post',
      //         label: 'name', //key的字段
      //         value: 'id', //value的字段
      //         callback: function (value) {
      //             return value.cityData
      //         },
      //     },
      //     value: '',
      // },
      {
        type: 'input', // 普通输入框
        field: 'extensionNumber',
        name: '分机号：',
        value: ''
      },
      // {
      //     type: "select", //普通输入框
      //     field: "region",
      //     name: "区域：",
      //     packet: 2,
      //     filterable: true, //可搜索
      //     multiple: false, //多选
      //     divwidth: '33.33%',
      //     options: [],
      //     ajax: {
      //         url: this.$url.getRegion, //url地址
      //         data: {}, //参数
      //         method: 'post',
      //         label: 'name', //key的字段
      //         value: 'id', //value的字段
      //         callback: function (value) {
      //             return value.cityData
      //         },
      //     },
      //     value: '',
      // },
      {
        value: '',
        type: 'select', // 普通下拉框
        field: 'roleId',
        name: '角色',
        filterable: true, // 可搜索
        multiple: false, // 多选
        options: []
        // ajax: {
        //     url: this.$url.getAllRole, //url地址
        //     data: {}, //参数
        //     // method: 'post',
        //     label: 'name', //key的字段
        //     value: 'id', //value的字段
        // }
      }
        // {
        //     type: "select", //普通输入框
        //     field: "orgId",
        //     name: "所属部门：",
        //     packet: 3,
        //     filterable: true, //可搜索
        //     multiple: false, //多选
        //     divwidth: '33.33%',
        //     options: [],
        //     ajax: {
        //         url: this.$url.getOrg, //url地址
        //         data: {}, //参数
        //         method: 'post',
        //         label: 'department', //key的字段
        //         value: 'id', //value的字段
        //         callback: function (value) {
        //             return value.cityData
        //         },
        //     },
        //     value: '',
        // },
      ]
    }
  },
  methods: {
    handleClose (done) {
      done()
    },
    headClack (v) {
      let formData = this.$refs.myform.submitForm()
      let picUrl = this.$refs.imgUrl.imgKey
      // if (picUrl == '') {
      //     this.$message.error('请上传头像')
      // } else
      if (formData) {
        formData['img'] = picUrl
        this.$axios.ajax({
          method: 'post',
          url: this.$url.addCustomerUser,
          data: formData
        }).then((res) => {
          if (res.code === '0') {
            this.sucInfo = res.data
            this.dialogVisible = true
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    sureAdd () {
      this.$router.push({
        name: 'addressBook'
      })
    }
  }
}

</script>

<style scoped>

</style>
