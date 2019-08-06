const Mock = require('mockjs')
const listData = function () {
  let item = {
    'code': 200,
    'data': {
      list: [{
        id: 1,
        orderNo: '张三',
        age: 12
      },
      {
        id: 2,
        name: '李四',
        age: 13
      }
      ]
    },
    'msg': 'success'
  }
  return item
}
Mock.mock('/api/getInsuranceCarInfo', 'post', listData)
