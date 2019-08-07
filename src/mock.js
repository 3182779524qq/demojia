const Mock = require('mockjs')
const listData = function () {
  let item = {
    'code': 200,
    'data': {
      list: [{
        id: 1,
        name: '张三',
        age: 18,
        phone: 17779036602,
        sex: '男',
        status: 1
      },
      {
        id: 2,
        name: '李四',
        age: 18
      }
      ]
    },
    'msg': 'success'
  }
  return item
}
Mock.mock('/api/getInsuranceCarInfo', 'post', listData)
