<template>
    <div class="login-wrap">
        <div class="ms-title">驾考模拟考试管理系统</div>
        <!-- <div class="ms-title">{{systemConfig['system.name']?systemConfig['system.name']:company}}访客管理系统</div> -->
        <div class="ms-login">
            <div class="company_icon">
                <!-- <div>考</div> -->
                <!-- <img :src="systemConfig['system.logo']" alt="" v-if="systemConfig['system.logo']"> -->
                <!-- <img src="../../assets/img/ic.png"> -->
            </div>
            <div class="ms-login-input-content">
                <div class="login-icon user_name"></div>
                <div class="login-input">
                    <input type="text" v-model="userName" placeholder="请输入用户名" maxlength="20">
                </div>
            </div>
            <div class="ms-login-input-content">
                <div class="login-icon user_psd"></div>
                <div class="login-input">
                    <input type="password" v-model="passWord" placeholder="请输入密码" maxlength="20">
                </div>
            </div>
            <div class="forget">
                忘记密码
            </div>
            <!-- <div class="sliding_block">
                <captchaVue @captchaData="getCaptchaData" ref="captcha"></captchaVue>
            </div> -->
            <!-- <div class="ms-verify">
                <div class="ms-verify-input">
                    <input type="text" v-model="vCode" v-input-number='vCode' placeholder="短信验证码"
                        @keyup.enter="enterSubmit" maxlength="6">
                </div>
                <div class="get_code_btn">
                    <el-button type="success" round :disabled='disabled' class="code_btn" @click="getVcode">{{codeText}}
                    </el-button>
                </div>

            </div> -->
            <div class="login-btn">
                <el-button type="primary" @click="submitForm()" round :disabled="loginDisabled">登录</el-button>
            </div>
        </div>
    </div>

</template>

<script>
    // import sha1 from 'js-sha1';
    import GlobalUtil from '@/utils/globalUtil';
    export default {
        data: function () {
            return {
                company: '云客派',
                disabled: true,
                loginDisabled: false,
                userName: '',
                passWord: '',
                codeText: '发送',
                flag: true,
                vCode: '',
                session: '',
                token: "",
                sig: '',
            }
        },
        created() {
            // this.getSystemConfig()
        },
        mounted() {},
        computed: {
            systemConfig() {
                return this.$store.state.systemConfig
            }
        },
        methods: {
            getSystemConfig() {
                this.$store.dispatch('getSystemConfig')
            },
            enterSubmit() {
                if (this.loginDisabled) {
                    return false
                } else {
                    this.submitForm()
                }
            },
            submitForm() { //登录验证
                this.$router.push('/home');
                // this.$axios.post(this.$url.login, {
                //     userName: this.userName,
                //     password: this.passWord
                // }).then(res => {
                //     if (res.data.token) {
                //         let headers = {
                //             token: res.data.token,
                //             username:res.data.userName,
                //         }
                //         GlobalUtil.setCookie('headers', JSON.stringify(headers))
                //     }
                //     GlobalUtil.setSessionStorage('adminInfo', res.data)
                //     this.$router.push('/home');
                //     // this.$axios.get(this.$url.getAdminInfo).then(res => {
                //     //      this.loginDisabled = true;
                //     //     // console.log(res)
                //     //     if (res.data) {
                //     //         GlobalUtil.setSessionStorage('adminInfo', res.data)
                //     //         this.$router.push('/home');
                //     //     }
                //     // }).catch(error=>{
                //     //      this.loginDisabled = false;
                //     // })
                // })
            },

            getCaptchaData(data) { //获取滑块验证结果
                if (!this.userName) {
                    this.$message.error('请填写正确的用户名！');
                    this.initCaptCha();
                    return false;
                } else if (!this.passWord) {
                    this.$message.error('请填写正确的登录密码！');
                    this.initCaptCha();
                    return false;
                }
                // console.log(data)
                this.session = data.csessionid;
                this.token = data.token;
                this.sig = data.sig;
                this.disabled = false;
            },
            getVcode() { //获取短信验证码
                if (!this.userName) {
                    this.$message.error('请填写正确的用户名！');
                    this.initCaptCha();
                    return false;
                } else if (!this.passWord) {
                    this.$message.error('请填写正确的登录密码！');
                    this.initCaptCha();
                    return false;
                } else if (!this.token) {
                    this.$message.error('请重新验证滑块！');
                    this.initCaptCha();
                    return false;
                } else if (this.flag) {
                    let loop = 59;
                    let that = this;
                    let clock = setInterval(function () {
                        if (loop >= 0) {
                            that.codeText = loop-- + " S";
                        } else {
                            that.flag = true;
                            that.codeText = '发送';
                            clearInterval(clock);
                        }
                    }, 1000);
                }
            },
            initCaptCha() { //重置滑块
                this.$refs.captcha.init();
                this.disabled = true;
                this.loginDisabled = false;
            }
        }
    }
</script>

<style scoped>
    input {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        background: none;
    }

    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background:#1ABC9C;
        background-size: 100% 100%;
    }

    .sliding_block {
        height: 40px;
        margin-bottom: 30px;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -250px;
        text-align: center;
        font-size: 30px;
        color: #fff;
        font-weight: bold;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 480px;
        height: 500px;
        background: #FFFFFF;
        margin-left: -240px;
        margin-top: -150px;
        border-radius: 8px;
    }

    .company_icon {
        width: 100%;
        height: 85px;
        margin: 30px 0 30px 0;
        text-align: center;
    }
    /* .company_icon div {
        border-radius: 50%;
        background: #1ABC9C;
        color: #fff;
        height: 85px;
        width: 85px;
        margin: 0 auto;
        line-height: 85px;
        font-size: 46px;
    } */
    .company_icon img {
        height: 85px;
    }

    .ms-login-input-content {
        width: 420px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 30px;
        overflow: hidden;
        background: #fff;
        border-radius: 25px;
        font-weight: bold;
    }

    .ms-login-input-content::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #DCDEE3;
        z-index: 1;
    }

    .forget {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #888;
        text-align: right;
        margin-right: 30px
    }

    .ms-verify {
        /* float: left; */
        width: 330px;
        overflow: hidden;
        height: 50px;
        color: #fff;
        margin-bottom: 30px;
    }

    .ms-verify-input {
        float: left;
        width: 180px;
        height: 38px;
        line-height: 38px;
        border: 1px solid #FFFFFF;
        border-radius: 20px;
        text-indent: 1em;
        color: #fff
    }

    .ms-verify-input input {
        color: #FFFFFF;
    }

    .ms-verify-input input::-moz-placeholder {
        color: #FFFFFF
    }

    .ms-verify-input input::-webkit-input-placeholder {
        color: #FFFFFF
    }

    .get_code_btn {
        float: right;
        width: 138px;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        /* background-color: #93CE7C; */
        cursor: pointer;
        /* overflow: hidden; */
    }

    .code_btn {
        width: 100%;
        border: 0px;

    }

    .login-icon {
        float: left;
        width: 20px;
        height: 20px;
        background-size: contain;
        margin: 15px;
    }

    .user_name {
        /* background: url('../../assets/img/username.png') no-repeat; */
    }

    .user_psd {
        /* background: url('../../assets/img/psd.png') no-repeat; */
    }

    .login-input {
        float: left;
        width: 280px;
        height: 50px;
        line-height: 50px;
        /* border-bottom: 1px solid #DCDEE3; */
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 380px;
        height: 56px;
        background:#1ABC9C;
        border-radius: 5px;
        margin-top: 50px;
    }
</style>