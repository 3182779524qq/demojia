// 此文件为所有的接口URL地址
// 测试环境
const baseUrl = '/api';//业务接口base
// 开发环境
    // admin: baseUrl + "admin", 
// const baseUrl = '';
const ServiceUrls = {
    // 登录模块
    login: baseUrl + "/admin/login",
    // 激活用户
    activateStudent: baseUrl + "/activate/activateStudent",
    getActivateList: baseUrl + "/activate/getActivateList", 
    activateAgain: baseUrl + "/activate/activateAgain", 
    sendSms: baseUrl + "/activate/sendSms", 

    //=============================='驾校信息'==============================
    getSchoolList: baseUrl + "/school/getSchoolList", 
    addSchool: baseUrl + "/school/addSchool", 
    modifySchool: baseUrl + "/school/modifySchool", 
    deleteSchool: baseUrl + "/school/deleteSchool", 
    addElectronicFence: baseUrl + "/schoolMap/addElectronicFence", // 添加电子围栏
    modifyElectronicFence: baseUrl + "/schoolMap/modifyElectronicFence", // 编辑电子围栏
    deleteElectronicFence: baseUrl + "/schoolMap/deleteElectronicFence", // 编辑电子围栏

    //=============================='模拟练车'==============================
    getWorkList: baseUrl + "/work/getWorkList", 
    addWork: baseUrl + "/work/addWork", 
    modifyWork: baseUrl + "/work/modifyWork", 
    getSchoolNames: baseUrl + "/school/getSchoolNames", 

    //=============================='采集管理'==============================
    authorizeList: baseUrl + "/authorize/authorizeList", 
    authorizeImageList: baseUrl + "/authorize/authorizeImageList", 
    authorizeImage: baseUrl + "/authorize/authorizeImage", 
    deleteAuthorize: baseUrl + "/authorize/deleteAuthorize", 

    getSMSList: baseUrl + "/sms/list", 

}
export default ServiceUrls;