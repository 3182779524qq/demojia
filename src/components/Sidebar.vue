<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" background-color="#6890fe" text-color="#ffffff"
      :collapse="collapse" active-text-color="#ffffff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index" v-if="item.show">
            <template slot="title">
              <i :class="item.icon" class="iconfont"></i><span slot="title">{{ item.title }}</span>
            </template>
            <template v-if="subItem.show">
                <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                <i :class="subItem.icon" class="iconfont"></i><span slot="title">{{ subItem.title }}</span>
                </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index" v-if="item.show">
            <i :class="item.icon" class="iconfont"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
  import bus from './bus';
  import GlobalUtil from '../utils/globalUtil';
  export default {
    data() {
      return {
        collapse: false,
        items: [{
            icon: 'icon-shujufenxi',
            index: 'demo',
            show: true,
            title: '表格'
          },
          {
            icon: 'icon-guanligudong',
            index: 'demoTable',
            show: true,
            title: '表单'
          },
          {
            icon: 'icon-zhiliangfenxi',
            index: '1',
            title: '运营管理',
            show: false,
            subs: [{
                icon: 'icon-gift-liwu',
                index: 'operationList',
                show: false,
                title: '运营活动'
              },
              {
                icon: 'icon-kecheng',
                index: 'strategyConfiguration',
                show: false,
                title: '攻略配置'
              },
              {
                icon: 'icon-pinpaiguanli',
                index: 'operateTips',
                show: false,
                title: '小贴士 '
              },
            ]
          }
        ]
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      // this.getPermission()
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    },
    methods: {
      getPermission() {
        let data = GlobalUtil.getLocalStorage('permission');
        // console.log(data)
        let arr = []
        for (let obj of data) {
          if (obj.resourceType == 1) {
            arr.push(obj)
          }
        }
        // console.log(arr.sort(this.compare('resourseId')))
        let routers = ['403', 'home']
        for (let r of arr) {
          switch (r.resourseId) {
            case 200:
              this.items[0].show = true;
              routers.push(this.items[0].index);
              break;
            case 300:
              this.items[1].show = true;
              routers.push(this.items[1].index);
              routers.push('taskDetail');
              break;
            case 400:
              this.items[2].show = true;
              routers.push(this.items[2].index);
              break;
            case 500:
              this.items[3].show = true;
              routers.push(this.items[3].index);
              break;
            case 600:
              this.items[4].show = true;
              break;
            case 610:
              this.items[4].subs[0].show = true;
              routers.push(this.items[4].subs[0].index);
              break;
            case 620:
              this.items[4].subs[1].show = true;
              routers.push(this.items[4].subs[1].index);
              break;
            case 630:
              this.items[4].subs[2].show = true;
              routers.push(this.items[4].subs[2].index);
              break;
            case 700:
              this.items[5].show = true;
              routers.push(this.items[5].index);
              break;
            case 800:
              this.items[6].show = true;
              routers.push(this.items[6].index);
              break;
            case 900:
              this.items[7].show = true;
              routers.push(this.items[7].index);
              break;
          }
        }
        GlobalUtil.setLocalStorage('routers', routers);
      },
      compare(name, minor) {
        return function (o, p) {
          var a, b;
          if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
              return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
              return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
          } else {
            thro("error");
          }
        }
      }
    }
  }

</script>
<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
  }

  .iconfont {
    padding-right: 7px;
  }

  /* .icon-pinpaiguanli{
        margin-right: 20px;
    } */
  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
  }

  .sidebar>ul {
    height: 100%;
  }

  .el-menu-item.is-active {
    background-color: #ffffff !important;
    color: #6890fe !important;
  }

  .el-menu-item.is-active i {
    color: inherit !important;
  }

  .el-menu-item i {
    color: #ffffff;
  }

  .el-menu--inline li {
    background-color: #86a6fe !important;
  }

  .el-menu-item {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

</style>
<style>
  .sidebar .el-submenu__title {
    color: #ffffff;
    text-align: center;
  }

  .sidebar .el-submenu__title i {
    color: #ffffff;
  }

</style>
