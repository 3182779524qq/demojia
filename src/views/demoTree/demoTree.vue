<template>
  <div class="demo_other">
    <cfjTree :folder="folder" :selects="select" :currentId="currentId"></cfjTree>
  </div>
</template>
<script>
  // import GlobalUtil from '@/utils/globalUtil'
  export default {
    data() {
      return {
        currentId:['1-1',"1-2"],
        folder: [{
            id: 1,
            label: "1级目录1",
            show: false,
            children: [{
                id: "1-1",
                label: "1.1目录"
              },
              {
                id: "1-2",
                label: "1.2目录"
              },
              {
                id: "1-3",
                label: "1.3目录"
              },
            ]
          },
          {
            id: 2,
            label: "1级目录2",
            show: false
          },
          {
            id: 3,
            label: "1级目录3",
            show: false,
            children: [{
                id: "3-1",
                label: "3.1目录"
              },
              {
                id: "3-2",
                label: "3.2目录",
                show: false,
                children: [{
                    id: "3-2-1",
                    label: "3.2.1目录"
                  },
                  {
                    id: "3-2-2",
                    label: "3.2.2目录"
                  },
                  {
                    id: "3-2-3",
                    label: "3.2.3目录"
                  }
                ]
              }
            ]
          },
          {
            id: 4,
            label: "1级目录4",
            show: false,
            children: [{
                id: "4-1",
                label: "4.1目录"
              },
              {
                id: "4-2",
                label: "4.2目录",
                show: false,
                children: [{
                  id: "4-2-1",
                  label: "4.2.1目录"
                }]
              }
            ]
          },
          {
            id: 5,
            label: "1级目录5",
            show: false,
            children: [{
                id: "5-1",
                label: "5.1目录",
                show: false,
                children: [{
                    id: "5-1-1",
                    label: "5.1.1目录"
                  },
                  {
                    id: "5-1-2",
                    label: "5.1.2目录",
                    show: false,
                    children: [{
                      id: "5-1-2-1",
                      label: "5.1.2.1目录",
                      show: false,
                    children: [{
                      id: "5-1-2-1",
                      label: "5.1.2.1目录"
                    }, ]
                    } ]
                  }
                ]
              },
              {
                id: "5-2",
                label: "5.2目录",
                show: false
              }
            ]
          },
        ],
      }
    },
    methods: {
      select(data) {
        console.log(data,'==================')
      },
      open2() {
        this.sucMsg('哈哈，对咯')
      },
      open3() {
        this.confirm({
          title: '嗷嗷', // 标题
          message: '这是一个神奇的操作', // 开启自定义HTML // 开启自定义HTML

          customClass: 'hhhclass', // 自定义类名

          cancelButtonText: '取消', // 取消
          confirmButtonText: '确定', // 确定
          cancelFun: () => {}, // 取消回调
          thenFun: () => {
            this.sucMsg('你点击了确定')
          } // 确定回调
        })
      },
      open4() {
        this.confirm({
          message: '<h3>这是自己写的弹窗</h3><div>啦啦啦德玛西亚</div>', // 开启自定义HTML // 开启自定义HTML
          customClass: 'clear_el_dialog', // 自定义类名

          cancelButtonText: '取消', // 取消
          confirmButtonText: '确定', // 确定
          cancelFun: () => {}, // 取消回调
          thenFun: () => {
            this.sucMsg('你点击了确定')
          } // 确定回调
        })
      }
    }
  }

</script>
<style scoped>
  /* .demo_other {} */
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
