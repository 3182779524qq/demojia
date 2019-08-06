//   全局方法
export default class GlobalUtil {

  constructor () {}
  /**
   * 深拷贝
   * @param data
   */
  static deepCopy (data) {
    return JSON.parse(JSON.stringify(data))
  }

  /**
   * 深拷贝
   * @param obj
   */
  static deepClone (obj) {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          //   判断ojb子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === 'object') {
            objClone[key] = this.deepClone(obj[key])
          } else {
            //   如果不是，简单复制
            objClone[key] = obj[key]
          }
        }
      }
    }
    return objClone
  }

  /**
   * 开发模式测试使用方法
   * console 颜色定制化
   * @param data
   * @param color
   */
  static console (str, color) {
    //   systemConfig
    console.log('%c ' + str, 'color: ' + color)
    console.log(str)
  }
  /**
   * 开发模式测试使用方法
   * console 颜色定制化
   * @param data
   * @param color
   */
  static systemConfig () {
    let obj = window.sessionStorage.getItem('systemConfig')
    if (obj) {
      return JSON.parse(obj)
    } else {
      return {
        'son.menu.name': '公司',
        'system.name': '云客派',
        'system.logo': 'http://www.yunkepai.com/resource/front/pc_default/images/logo.png?v=1.4.0',
        'top.menu.name': '区域',
        'top.menu.required': 'true'
      }
    }
  }

  /**
   * setSessionStorage
   */
  static setSessionStorage (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * getSessionStorage
   */
  static getSessionStorage (key) {
    let result = window.sessionStorage.getItem(key)
    if (result) {
      return JSON.parse(result)
    } else {
      return result
    }
  }

  /**
   * setSessionStorage
   */
  static removeSessionStorage (key) {
    window.sessionStorage.removeItem(key)
  }

  /**
   * setLocalStorage
   */
  static setLocalStorage (key, value) {
    //    console.log(JSON.stringify(value))
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * getLocalStorage
   */
  static getLocalStorage (key) {
    let result = window.localStorage.getItem(key)
    if (result) {
      return JSON.parse(result)
    } else {
      return result
    }
  }

  /**
   * setSessionStorage
   */
  static removeLocalStorage (key) {
    window.localStorage.removeItem(key)
  }

  /**
   * 写cookie
   * @param name
   * @param value
   * @param day
   */
  static setCookie (name, value, day) {
    let days = day
    let exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  }

  /**
   * 读cookie
   * @param name
   * @returns {*}
   */
  static readCookie (name) {
    let arr = null
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (document.cookie && (arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    } else {
      return null
    }
  }

  /**
   * 删除cookie
   * @param name
   */
  static delCookie (name) {
    let cval = this.readCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + (new Date(0)).toGMTString()
    }
  }
  /**
   * 拼接操作日志字符串
   * @param type TODO 操作类型描述
   * @param name TODO 操作项名字
   */
  static handleLog (type, name) {
    return encodeURI(type + '"' + name + '"')
  }

  /**
   * 点击图片放大
   * @param url
   */
  static bigImage (url) {
    let div = document.createElement('div')
    div.setAttribute('id', 'big-img-bg')
    div.innerHTML = "<div class='big-img-box'><img src='" + url + "' alt=''></div>"
    document.body.appendChild(div)
    let bigImgBg = document.getElementById('big-img-bg')
    document.addEventListener('keydown', close)

    function close (e) {
      if (e.keyCode === 27) {
        bigImgBg.parentNode.removeChild(bigImgBg)
        document.removeEventListener('keydown', close)
      }
    }
    //   关闭图片
    bigImgBg.onclick = function () {
      this.parentNode.removeChild(this)
      document.removeEventListener('keydown', close)
    }
  }
  /**
   * 字节转换
   * @param url
   */
  static bytesToSize (bytes) {
    if (bytes === 0) return '0 B'
    var k = 1024
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    //   return (bytes / Math.pow(k, i)) + ' ' + sizes[i]
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    //   toPrecision(3) 后面保留两位小数，如1.00GB
  }
  /**
   * 校验数据
   * @param obj
   * 校验成功返回对象result.status为true /失败返回result.status为false 同时返回错误信息msg
   */
  //   校验数据
  static checkParameters (params) {
    let result = {
      status: false,
      msg: ''
    }
    for (let i = 0, len = params.length; i < len; i++) {
      if (params[i].required && params[i].required === true) {
        if (Array.isArray(params[i].value) && params[i].value.length === 0 || typeof params[i].value === 'string' && !params[i].value.trim()) {
          result.msg = '“' + params[i].titName + '” 不能为空'
          result.status = false
          return result
        } else if (!Array.isArray(params[i].value) && params[i].regexp.trim()) {
          if (params[i].regexp.trim() === 'username') {
            if (!/^[\w-]{4,30}$/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else if (params[i].regexp.trim() === 'password') {
            if (!/^[\w\@-]{6,30}$/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else if (params[i].regexp.trim() === 'code16') {
            if (!/^#?([a-f0-9]{6}|[a-f0-9]{3})$/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result

            }
          } else if (params[i].regexp.trim() === 'email') {
            if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else if (params[i].regexp.trim() === 'phone') {
            if (!/(13[0-9]|15[012356789]|17[0-9]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else if (params[i].regexp.trim() === 'idcard') {
            if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else if (params[i].regexp.trim() === 'url') {
            if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else if (params[i].regexp.trim() === 'ip') {
            if (!/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else if (params[i].regexp.trim() === 'html') {
            if (!/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else if (params[i].regexp.trim() === 'chinese') {
            if (!/^[\u2E80-\u9FFF]+$/.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          } else {
            //   字符串类型的正则表达式
            let exp = eval(params[i].regexp)
            if (!exp.test(params[i].value)) {
              result.msg = '“' + params[i].titName + '” 输入格式错误，请重新输入'
              result.status = false
              return result
            }
          }
        }
      }
    }
    result.status = true
    return result
  }

  /**
   * 对象数组字段数据处理，用于转换数组对象中的字段名称，多用于下拉选项数据处理
   * @param source[]数据源
   * @param dataKey{} 要处理的字段{sourceKey：newKey}
   * @param merge boole //   是否合并，true直接在源数据中增加新字段并返回，false返回新字段数组对象 --默认true
   * @param toString 是否转字符串，默认是
   * @param filter   对象{status：0}//   过滤出所有status为0的项目
   * 返回值 return:[],数组对象
   */
  static arrayDataKeyDispose (source, dataKey, merge = true, toString = true, filter) {
    let dataNew = []
    for (let item in source) {
      let goNext = false
      for (let fkey in filter) {
        if (source[item][fkey] !== filter[fkey]) {
          goNext = true
        }
      }
      if (goNext) {
        continue
      }
      let inData = {}
      for (let jitem in dataKey) {
        if (merge) {
          source[item][dataKey[jitem]] = toString ? (typeof source[item][jitem] === 'string') ? source[item][jitem] : JSON.stringify(source[item][jitem]) : source[item][jitem]
        } else {
          inData[dataKey[jitem]] = toString ? (typeof source[item][jitem] === 'string') ? source[item][jitem] : JSON.stringify(source[item][jitem]) : source[item][jitem]
        }
      }
      if (!merge) {
        dataNew.push(inData)
      }
    }
    return merge ? source : dataNew
  }

  /**
   * 多级对象数组处理
   * @param sourceArr[]数据源
   * @param dataKeyarr[] 要处理的字段[第一级处理{sourceKey：newKey},第二级处理{sourceKey：newKey}]
   * @param merge boole //   是否合并，true直接在源数据中增加新字段并返回，false返回新字段数组对象 --默认true
   * 返回值 return:[],数组对象
   */
  static childrenArrayDataKeyDispose (sourcearr, dataKeyArr, merge = true, toString = true) {

  }

  /**
   * 对象数组数据提取，返回所需字段的数组
   * @param source[]数据源
   * @param key String 要提取的字段
   * 返回值 return:[],数组
   */
  static getArrayDataKeyValue (source, key) {
    let dataNew = []
    for (let item of source) {
      if (item && item[key]) {
        dataNew.push(item[key])
      }
    }
    return dataNew
  }

  /**
   * dataFom单表单获取值数据
   * 配合dataFom组件取出dataFom配置中的field/value数据
   * @param FormDataConfig{}
   * 返回值 return:{field:value}
   */
  static getFormData (dataForm) {
    let returnData = {}
    for (let i = 0, len = dataForm.length; i < len; i++) {
      if (dataForm[i].value && typeof dataForm[i].value === 'string' ||
        dataForm[i].value && dataForm[i].value.length > 0 ||
        dataForm[i].value && typeof dataForm[i].value === 'object' && dataForm[i].value.length > 0 ||
        dataForm[i].value && typeof dataForm[i].value === 'number') {
        returnData[dataForm[i].field] = dataForm[i].value
      }
    }

    return returnData
  }

  /**
   * dataFom多表单获取值数据
   * 配合dataFom组件取出dataFom配置中的field/value数据
   * @param FormDataConfig{}
   * 返回值 return:[{field:value},{field:value}]
   *
   */
  static getEachFormData (dataForm) {
    let returnData = []
    dataForm.forEach((e, i) => {
      let innerData = {}
      for (let i = 0, len = e.length; i < len; i++) {
        if (e[i].value && typeof e[i].value === 'string' || e[i].value && e[i].value.length > 0) {
          innerData[e[i].field] = e[i].value
        }
      }
      returnData.push(innerData)
    })
    return returnData
  }

  /**
   * 编辑时用于填入编辑数据，可指定源数据对象的key填入目标对象，默认目标对象key填入所以符合源对象的key值
   *
   * @param sourceData{} //   源数据对象 必填
   * @param resultData{} //赋值对象 必填
   * @param selectKey{} //指定key赋值对象{源key:赋值key} 选填
   * //编辑时填入多个字段数据,源数据对象中的除field字段以外的editimgurl字段的数据填到valueUrl字段
   * fillMoreKey在赋值对象中设置可单个对象赋值多个值fillMoreKey:{editimgurl:valueUrl},

   * 返回值 返回赋值后的resultData新对象
   */
  static fillEditData (sourceData, resultData, selectKey) {
    if (selectKey) {
      for (let i = 0, len = resultData.length; i < len; i++) {
        for (let item in selectKey) {
          if (resultData[i].field === selectKey[item]) {
            //    field字段赋值
            resultData[i].value = sourceData[item]
            //    扩展字段赋值
            if (resultData[i].fillMoreKey) {
              for (let key in resultData[i].fillMoreKey) {
                if (key) {
                  resultData[i][resultData[i].fillMoreKey[key]] = sourceData[key]
                }
              }
            }
          }
        }
      }
    } else {
      for (let i = 0, len = resultData.length; i < len; i++) {
        if (sourceData[resultData[i].field]) {
          //    field字段赋值
          resultData[i].value = sourceData[resultData[i].field]
          //    扩展字段赋值
          if (resultData[i].fillMoreKey) {
            for (let key in resultData[i].fillMoreKey) {
              if (key) {
                resultData[i][resultData[i].fillMoreKey[key]] = sourceData[key]
              }
            }
          }
        }
      }
    }
    return resultData
  }

  /**
   * 多form表单数组填入数据
   *
   * @param source{} //源数据数组 必填
   * @param resultData{} //form数组模板 必填
   * @param selectKey{} //指定key赋值对象{源key:赋值key} 选填
   * 返回值 返回赋值后的resultData返回赋值后的新数组
   *
   */
  static moreFormFill (source, fillFormTemp, selectKey) {
    let it = this
    let resultData = []
    if (Array.isArray(source) && source.length) {
      source.forEach((e, i) => {
        let defForm = it.deepCopy(fillFormTemp)
        it.fillEditData(e, defForm, selectKey)
        resultData.push(it.fillEditData(e, defForm, selectKey))
      })
      return resultData
    } else {
      return [this.deepCopy(fillFormTemp)]
    }
  }
  /**
   * 时间戳日期时间格式
   *
   * @param val //时间戳 必填
   * 返回值 格式化后的时间字符串
   *
   */
  static timeTodate (val) {
    let date = new Date(val)
    let seperator1 = '-'
    let seperator2 = ':'
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let days = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if (month >= 0 && month <= 9) {
      month = '0' + month
    }
    if (days >= 0 && days <= 9) {
      days = '0' + days
    }
    if (hours >= 0 && hours <= 9) {
      hours = '0' + hours
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = '0' + minutes
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = '0' + seconds
    }
    let time = year + seperator1 + month + seperator1 + days +
      ' ' + hours + seperator2 + minutes +
      seperator2 + seconds
    //    console.log(time)
    return time
  }
  /**
   * 时间戳日期时间格式
   *
   * @param time // 时间戳 必填
   * @param formatType //格式化方式 Y年(YY年份，YYYY全写),M月,D日,H时24制，h为12制，m分s秒,w周（ww全写），默认YYYY-M-D H:m:s ww
   * 返回值 格式化后的时间字符串
   *
   */
  static dateFormat (time, formatType) {
    //    console.log(time)
    if (!time) {
      return ''
    }
    formatType = formatType || 'YYYY-M-D H:m:s ww'
    let nTime = Number(time)
    let date = new Date(nTime)
    let o = {
      'M': date.getMonth() + 1, //    月份
      'D': date.getDate(), //    日
      'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //    小时
      'H': date.getHours(), //    小时
      'm': date.getMinutes(), //    分
      's': date.getSeconds(), //    秒
      'q': Math.floor((date.getMonth() + 3) / 3), //    季度
      'S': date.getMilliseconds() //    毫秒
    }
    let year = formatType.match(/(y+)/i)
    let subWeek = formatType.match(/(w+)/i)
    let week = {
      '0': '日',
      '1': '一',
      '2': '二',
      '3': '三',
      '4': '四',
      '5': '五',
      '6': '六'
    }
    if (year && year[0]) {
      formatType = formatType.replace(year[0], (date.getFullYear() + '').substr(4 - year[0].length))
    }
    if (subWeek && subWeek[0]) {
      formatType = formatType.replace(subWeek[0], ((subWeek[0].length > 1) ? (subWeek[0].length > 2 ? '星期' : '周') : '') + week[date.getDay() + ''])
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(formatType)) {
        formatType = formatType.replace(k, (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return formatType
  }
  /**
   * 图片压缩处理
   * 三个参数
   * @param file：一个是文件(类型是图片格式)，
   * @param config：压缩配置{width：设置宽100，height：设置高100，quality：设置压缩质量0.2}
   * @param isBase64：设置返回值是否为base64 //true-返回base64 、 默认false-返回Blob对象
   * @param returnData：回调函数返回压缩结果图片Blob对象
   *
   */
  static photoCompress (file, config, isBase64, returnData) {
    let it = this
    it.convertBlobToBase64Url(file, function (base64) {
      it.canvasDataURL(base64, config, function (subBase64) {
        if (isBase64) {
          returnData(subBase64)
        } else {
          returnData(it.convertBase64UrlToBlob(subBase64))
        }
      })
    })
  }

  /**
   * 将以Blob的图片url数据转换为base64
   * @param file：一个是文件(类型是Blob图片格式)，
   * @param callBack回调函数 返回：base64图片
   *
   */

  static convertBlobToBase64Url (file, callBack) {
    let ready = new FileReader()
    /**
     * 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性
     * 的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,
     * result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
    */
    ready.readAsDataURL(file)
    ready.onload = function () {
      callBack(this.result)
    }
  }
  /**
   * 图片压缩
   * 三个参数
   * @param file：一个是文件(类型是base64图片格式)，
   * @param obj{width：设置宽100，height：设置高100，quality：设置压缩质量0.2}
   * @param callback：一个是容器或者回调函数
   *
   */
  static canvasDataURL (path, obj, callback) {
    let img = new Image()
    img.src = path
    img.onload = function () {
      let that = this
      //   默认按比例压缩
      let w = that.width
      let h = that.height
      let scale = w / h
      w = obj.width || w
      h = obj.height || (w / scale)
      let quality = 0.7 //    默认图片质量为0.7
      //   生成canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      //    创建属性节点
      let anw = document.createAttribute('width')
      anw.nodeValue = w
      let anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(that, 0, 0, w, h)
      //    图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality
      }
      //    quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality)
      //    回调函数返回base64的值
      callback(base64)
    }
  }
  /**
   * 将以base64的图片url数据转换为Blob
   * @param urlData
   *            用url方式表示的base64图片数据
   */
  static convertBase64UrlToBlob (urlData) {
    let arr = urlData.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {
      type: mime
    })
  }
  /**
   *
   * @param {*} string 字符串
   * @param {*} length 最大长度
   */
  static regString (string, length) {
    //    定义最大字节
    var maxtext = length || 20
    var d = 0
    //    匹配汉字
    if (string.match(/[\u4e00-\u9fa5]/g)) {
      d = string.match(/[\u4e00-\u9fa5]/g).length
    }
    maxtext = maxtext - d
    //    匹配字母，数字，不为空和汉字
    var str = '/^[\u4e00-\u9fa5a-zA-Z0-9]{1,' + maxtext + '}$/'
    if (!(eval(str).test(string))) {
      return false
    } else {
      return true
    }
  }
  /**
   * 操作历史数据字段转换
   * @param {obj} paramObj
   */
  static handleLogParams (paramObj) {
    console.log(paramObj)
    let arr = []
    let oldObj = paramObj.old
    let newObj = paramObj.new
    let fields = paramObj.fields || {}
    let options = paramObj.options || {}
    let key = paramObj.key || 'id'
    let keyValue = newObj[key] || '-'
    for (let index in oldObj) {
      let oldValue = oldObj[index] || '-'
      let newValue = newObj[index] === 0 ? 0 : newObj[index] || '-'
      if (oldValue.toString() === newValue.toString()) {
        continue
      }
      if (index !== key) {
        let _item = {
          id: keyValue
        }
        _item.field = fields[index] || index
        //    console.log(typeof oldValue)
        if (typeof oldValue === 'object') {
          _item.old = oldValue.map(item => options[index][item]).join(',')
          _item.new = newValue.map(item => options[index][item]).join(',')
        } else {
          if (options[index]) {
            _item.old = options[index][oldValue]
            _item.new = options[index][newValue]
          } else {
            _item.old = oldValue
            _item.new = newValue
          }
        }

        arr.push(_item)
      }
    }
    console.log(arr)
    return encodeURI(JSON.stringify(arr))
    //    console.log(paramObj)
  }
}
