<template>
  <div class="demo_other">
    <el-button type="primary" @click="open1">主要按钮</el-button>
    <el-button type="success" @click="open2">成功按钮</el-button>
    <el-button type="info" @click="open3">信息按钮</el-button>
    <el-button type="warning" @click="open4">警告按钮</el-button>
  </div>
</template>
<script>
// import GlobalUtil from '@/utils/globalUtil'
export default {
  data () {
    return {

    }
  },
  methods: {
    open1 () {
      this.errMsg('啊哦，错咯')
    },
    open2 () {
      this.sucMsg('哈哈，对咯')
    },
    open3 () {
      this.confirm({
        title: '嗷嗷', // 标题
        message: '这是一个神奇的操作', // 开启自定义HTML // 开启自定义HTML

        customClass: 'hhhclass', // 自定义类名

        cancelButtonText: '取消', // 取消
        confirmButtonText: '确定', // 确定
        cancelFun: () => {}, // 取消回调
        thenFun: () => {
          this.sucMsg('你点击了确定')
        } // 确定回调
      })
    },
    open4 () {
      this.confirm({
        message: '<h3>这是自己写的弹窗</h3><div>啦啦啦德玛西亚</div>', // 开启自定义HTML // 开启自定义HTML
        customClass: 'clear_el_dialog', // 自定义类名

        cancelButtonText: '取消', // 取消
        confirmButtonText: '确定', // 确定
        cancelFun: () => {}, // 取消回调
        thenFun: () => {
          this.sucMsg('你点击了确定')
        } // 确定回调
      })
    }
  }
}

</script>
<style scoped>
  /* .demo_other {} */
  .query_header {
    height: 40px;
    margin-bottom: 30px;
  }

  .query_table {
    /* padding: 27px; */
    /* background: #292C41; */
    border-radius: 8px;
  }

</style>
