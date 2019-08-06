import promise from 'es6-promise'
import {
  Message
} from 'element-ui'
import axios from 'axios'
import router from '../router/router'
import GlobalUtil from '../utils/globalUtil'
promise.polyfill()
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = true
axios.defaults.timeout = 5000
//    请求拦截器
axios.interceptors.request.use((config) => {
  let header = JSON.parse(GlobalUtil.readCookie('headers'))
  config.headers = Object.assign(config.headers, header)
  return config
}, (error) => {
  console.log(error)
  return Promise.reject(error)
})
const errorStatus = [203, 205, 204]
//    响应拦截器
axios.interceptors.response.use((response) => {
  response.status === 500 && Message.error('服务器错误')
  response.status === 502 && Message.error('网络超时')
  response.status === 504 && Message.error('服务器错误')
  //    console.log(response)
  if (response.data.code !== 0 && response.data.code !== 200) {
    if (response.data.hash && response.data.key) {
      return response.data
    }
    Message.error(response.data.msg)
    if (errorStatus.indexOf(response.data.code) > -1) {
      router.push({
        name: 'login'
      })
    }
  }
  return response.data
}, (error) => {
  console.log(error)
  Message.error(error.response.status + codeMessage[error.response.status])
  return Promise.reject(error)
})

export default {
  //    get请求
  get (url, param, headers) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        headers: headers || {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //    post请求
  post (url, param, headers) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        headers: headers || {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ajax (config) {
    if (config.method.toLowerCase() === 'get') {
      return this.get(config.url, config.data)
    } else {
      return this.post(config.url, config.data, config.headers)
    }
  }
}
