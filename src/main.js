import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import common from './components/com.js'//  全局注册自定义组件
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'//  element字体色调
import axios from './axios/axios.js'//  请求响应拦截
import urls from './axios/serviceUrls'//  请求url地址
import confirm from './utils/confirm.js'//  自定义封装提示

require('./mock.js')

Vue.config.productionTip = false
Vue.use(common)
Vue.use(element)
Vue.use(confirm)
Vue.prototype.$axios = axios
Vue.prototype.$url = urls
router.beforeEach((to, from, next) => {
  if (to.name === null) {
    from.name ? next({
      name: from.name
    }) : next('/404')
  } else if (to.name === 'login') {
    next()
  } else {
    next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
