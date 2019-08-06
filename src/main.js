import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import common from './components/com.js'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios/axios.js'
import urls from './axios/serviceUrls'

require('./mock.js')

Vue.config.productionTip = false
Vue.use(common)
Vue.use(element)
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
