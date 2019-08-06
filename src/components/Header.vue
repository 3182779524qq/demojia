<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <!-- <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div> -->
        <div class="logo" @click="collapseChage"></div>
        <div class="system" @click="top" title="点击返回顶部 ↑">
            管理后台
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <div class="user-type">{{userType}}</div>
                <div class="user-name">{{username}} </div>
                <div class="user-loginOut" @click="loginout">退出</div>
                <!-- 全屏显示 -->
                <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div> -->
                <!-- 用户头像 -->
                <!-- <div class="user-avator"><img :src="avatar"></div> -->
                <!-- 用户名下拉菜单 -->

                <!-- <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
            </div>
        </div>
    </div>
</template>
<script>
    import bus from './bus';
    import GlobalUtil from '../utils/globalUtil';

    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'JMTool',
                message: 2,
                userInfo: GlobalUtil.getLocalStorage('userInfo'),
                avatar: 'http://up.qqya.com/allimg/201710-t/17-101805_137721.jpg'
            }
        },
        computed: {
            username() {
                // let username = GlobalUtil.getLocalStorage('userInfo').realName;
                // return username ? username : this.name;
                return '张三'
            },
            userType() {
                // let userInfo = GlobalUtil.getLocalStorage('userInfo');
                // if (userInfo.roles.length == 1) {
                //     return userInfo.roles[0].name
                // } else if (userInfo.roles.length == 2) {
                //     return '官方管理员'
                // }
                    return '官方管理员'
            },
            num() {
                return this.$store.state.num;
            },
        },
        created() {
            bus.$on('backTop', msg => { //监听点击事件后内页返回顶部
                // console.log(msg)
                this.$emit('backTop', 'jjjjj')
            })
        },
        methods: {
            top() { //点击后内页返回顶部
                // console.log(this.$refs)
                this.$emit('backTop', 'jjjjj')
            },
            add() {
                this.$store.commit('addNum');
            },
            // 退出登录
            loginout() {
                    this.$router.push('/login');
                // this.$axios.post(this.$url.doLoginOut).then(res => {
                //     if (res.retCode != 0) {
                //         return false
                //     }
                //     GlobalUtil.removeLocalStorage('author');
                //     GlobalUtil.removeLocalStorage('userInfo');
                //     GlobalUtil.delCookie('headers');
                //     GlobalUtil.removeLocalStorage('permission');
                //     GlobalUtil.removeLocalStorage('routers', ['403', '404', 'login']);
                //     this.$router.push('/login');
                // })

            },
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        color: #6890fe;
        overflow: hidden;
        background: #eee;
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 60px;
    }

    .header .logo {
        float: left;
        width: 124px;
        height: 30px;
        margin-left: 40px;
        margin-right: 10px;
        margin-top: 18px;
        /* background: url('../../assets/img/logo.png') no-repeat; */
        background-size: contain;
    }

    .header .system {
        float: left;
        font-size: 16px;
        line-height: 80px;
        cursor: pointer;
    }

    .header-right {
        float: right;
        padding-right: 50px;
        font-size: 12px;
        color: black;
        line-height: 60px;
        font-family: 'Microsoft YaHei'
    }

    .header-user-con {
        display: flex;
        height: 60px;
        align-items: center;
    }

    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }

    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-loginOut {
        margin-left: 20px;
        color: #c0c4d5;
        cursor: pointer;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>