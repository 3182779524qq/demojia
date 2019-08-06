export default function install (Vue) {
  //   成功提示 msg
  Vue.prototype.sucMsg = function (msg) {
    this.$message({
      message: msg,
      type: 'success'
    })
  }
  //   错误提示 msg
  Vue.prototype.errMsg = function (msg) {
    this.$message.error(msg)
  }
  // 确认提示框
  Vue.prototype.confirm = function (options = {}) {
    options = {
      title: options.title, // 标题
      message: options.message || '此操作将永久删除, 是否继续?<strong>这是<i>HTML</i>片段</strong>', // 开启自定义HTML
      dangerouslyUseHTMLString: !options.dangerouslyUseHTMLString, // 开启自定义HTML

      showClose: !options.showClose, // 是否显示右上角关闭按钮
      closeOnClickModal: !options.closeOnClickModal, // 是否可通过点击遮罩关闭
      closeOnPressEscape: !options.closeOnPressEscape, // 是否可通过按下 ESC 键关闭

      showCancelButton: !options.showCancelButton, // 是否显示取消按钮
      showConfirmButton: !options.showConfirmButton, // 是否显示确定按钮
      cancelButtonClass: options.cancelButtonClass || '', // 取消按钮的自定义类名
      confirmButtonClass: options.confirmButtonClass || '', // 确定按钮的自定义类名
      cancelButtonText: options.cancelButtonText || '取消', // 取消
      confirmButtonText: options.confirmButtonText || '确定', // 确定
      cancelFun: options.cancelFun || (() => {}), // 取消回调
      thenFun: options.thenFun || (() => {}) // 确定回调
    }
    this.$confirm(options.message, options.title, {
      dangerouslyUseHTMLString: options.dangerouslyUseHTMLString,
      showClose: options.showClose,
      closeOnClickModal: options.closeOnClickModal,
      closeOnPressEscape: options.closeOnPressEscape,
      showCancelButton: options.showCancelButton,
      showConfirmButton: options.showConfirmButton,
      cancelButtonClass: options.cancelButtonClass,
      confirmButtonClass: options.confirmButtonClass,
      cancelButtonText: options.cancelButtonText,
      confirmButtonText: options.confirmButtonText
    }).then(() => {
      options.thenFun()
    }).catch(() => {
      options.cancelFun()
    })
  }
}
