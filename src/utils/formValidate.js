const formValidate = {
  phone: function (rule, value, callback) {
    if (!(/^1[345678]\d{9}$/.test(value))) {
      callback(new Error('手机号码有误，请重填'))
    } else {
      callback()
    }
  },
  email: function (rule, value, callback) {
    var email = value
    var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (reg.test(email)) {
      callback()
    } else {
      callback(new Error('邮箱格式不正确'))
    }
  }
}
export default formValidate
