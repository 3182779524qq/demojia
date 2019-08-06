<template>
  <div class="demo_table">
    <div class="query_table">
      <dataTable :flush="fresh" :inSerachFilte="inSerachFilte" :inTableData="tableDataConfig" ref='dataTable'
        @rowClick="tableClickConfig" :inAjax="tableAjaxConfig">
      </dataTable>
    </div>
  </div>
</template>
<script>
  import GlobalUtil from '@/utils/globalUtil'
export default {
  data() {
    return {
      selectId: [],
      // 用于tableData组件刷新，tableData检测到fresh值发生变化就会刷新数据
      fresh: "",
      // 用于匹配搜索数据，返回新的数据
      inSerachFilte: {},
      // tableData组件参数配置
      tableDataConfig: {
        // 表头及字段配置
        tHead: [{
            name: '险单号',
            field: "orderNo",
          },
          {
            name: '报险日期',
            field: "createTime",
          },
          // {
          //     name: '报险人',
          //     field: "reportName",
          // },
          {
            name: '报险人电话',
            field: "phone"
          },
          {
            name: '状态',
            field: "status",
            type: 'function',
            callback: function (v, row) {
              if (v == '1' || v == '2' || v == '5' || v == '6') {
                return '<span style="color: #FEAC74">出勤中</span>'
              } else if (v == '3' || v == '4' || v == '7') {
                return '<span style="color: #CDD2F6">已结案</span>'
              } else {
                return '<span style="color: #8389B3">已关闭</span>'
              }
            },
          },
          {
            name: '操作',
            type: 'actionBtns', // 配置操作按钮actionSelectBtns为下拉按钮，actionBtns为平铺按钮
            field: "sendDate",
            callback: function (v, row) {
              console.log(v, row, '==================')
              let arr = []
              if (row.status === '2') {
                arr.push({
                  type: 'edit',
                  label: '<span>详情</span>'
                })
              } else {
                arr.push({
                  type: 'detail',
                  label: '<span>详情</span>'
                })
              }
              return arr
            }
          }
        ],
        // 自动渲染
        tData: [],
        // 自动渲染
        total: 0,
        actionBtWidth: '150',
        // 配置是否显示多选框
        isMultiple: false,
        // 配置是否显示排序
        isRank: false
      },
      // 表格初始化配置
      tableAjaxConfig: {
        url: this.$url.getInsuranceCarInfo,
        method: 'post',
        data: {
          pageNumber: 1,
          pageSize: 10,
          queryObj: {}
        }
      }
    }
  },
  methods: {
    //  tabel点击事件过滤可actionBtns配置的type过滤出table中点击的相应操作按钮
    tableClickConfig (obj) {
      // console.log(obj)
      if (obj.type === 'detail') {
        GlobalUtil.setLocalStorage('orderNo', obj.rowData.orderNo)
        this.$router.push({
          name: 'issureDetail'
        })
      } else if (obj.type === 'edit') {
        GlobalUtil.setLocalStorage('orderNo', obj.rowData.orderNo)
        this.$router.push({
          name: 'editIssure'
        })
      }
    },
    headClack (v) {
      if (v.searchValue.length === 19) {
        this.inSerachFilte = {
          queryObj: {
            orderNo: v.searchValue
          }
        }
      } else if (v.searchValue.length === 11) {
        this.inSerachFilte = {
          queryObj: {
            phone: v.searchValue
          }
        }
      } else {
        this.$message.error('请输入正确的手机号/险单号')
      }
    }
  }
}

</script>
<style scoped>
  /* .demo_table {} */
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
