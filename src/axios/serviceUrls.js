//    此文件为所有的接口URL地址
//    测试环境
const baseUrl = '/api' //   业务接口base
//    开发环境
//    const baseUrl = '';
const ServiceUrls = {
    //    登录模块
    login: baseUrl + "/admin/login",
    //    激活用户
    getInsuranceCarInfo: baseUrl + "/getInsuranceCarInfo"
}
export default ServiceUrls