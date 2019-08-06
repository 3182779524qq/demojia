import myform from './myform.vue'
import dataTable from './dataTable.vue'

export default function install (Vue) {
  Vue.component('myform', myform)
  Vue.component('dataTable', dataTable)
}
