import myform from './myform.vue'
import dataTable from './dataTable.vue'
import qnelup from './qnelup.vue'
import elcode from './elcode.vue'
import cfjTree from './cfjTree.vue'

export default function install (Vue) {
  Vue.component('myform', myform)
  Vue.component('dataTable', dataTable)
  Vue.component('qnelup', qnelup)
  Vue.component('elcode', elcode)
  Vue.component('cfjTree', cfjTree)
}
