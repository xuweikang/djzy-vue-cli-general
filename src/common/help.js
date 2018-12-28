import storage from '@/common/storage'

const config = require('config')

/**
 * 认证类型
 * @verifyStatus 认证状态
 * @verifyType 认证类型
 */
function getVerifyTypeAlias(verifyStatus, verifyType) {
  var ret = ''
  if (verifyStatus != '2') {
    ret = '未认证'
  } else {
    if (verifyType == '1' || verifyType == '2') {
      ret = '医师认证'
    } else if (verifyType == '3') {
      ret = '从业人员资格认证'
    } else if (verifyType == '4') {
      ret = '医学院师生认证'
    } else if (verifyType == '7') {
      ret = '实名认证'
    }
  }
  return ret
};

/**
 *
 *  1.医师认证：有职称的优先显示职称，没有职称的显示认证职业，不显示认证类型名称，如：有职称的显示为“主任医师” 或 没有职称的直接显示为“医师”
 *  2.从业人员认证：有认证职业的显示为“认证职业 空格 （从业人员）” ，如：针灸师（从业人员） ；没有认证职业的直接显示“从业人员”
 *  3.医学院师生认证：直接显示“医学院师生”
 *  4.实名认证：有认证职业的显示“认证职业 空格 （实名认证）”，如：民间中医 （实名认证）；没有认证职业的直接显示“实名认证”
 *  5.未认证：直接显示“未认证”
 */
function getVerifyTitle(verifyStatus, verifyType, verifyOccupation, verifyTitle) {
  var _verifyTypeName = getVerifyTypeAlias(verifyStatus, verifyType)

  switch (_verifyTypeName) {
    case '医师认证':
      return verifyTitle === null || verifyTitle === undefined ? verifyOccupation : verifyTitle
    case '从业人员资格认证':
      return verifyOccupation === null || verifyOccupation === undefined ? '从业人员' : verifyOccupation + ' (从业人员)'
    case '医学院师生认证':
      return '医学院师生'
    case '实名认证':
      return verifyOccupation === null || verifyOccupation === undefined ? '实名认证' : verifyOccupation + ' (实名认证)'
    case '未认证':
      return '未认证'
    default:
      return ''
  }
}

function getParams(params) {
  var ret = {}
  var x
  if (!!params) {
    // 提取最后一个/以后的字符串
    if (params.indexOf('/') >= 0) {
      params = params.slice(params.lastIndexOf('/') + 1)
    }
    var list = params.split('&')
    list.forEach(function (item) {
      x = item.split('=')
      ret[x[0]] = x[1]
    })
  }
  return ret
}

function paramsStr(obj) {
  let ret = ""
  for (let i in obj) {
    let str = i + '=' + obj[i]
    if (ret == "") {
      ret = str
    } else {
      ret += ('&' + str)
    }
  }
  return ret
}

/**
 * 格式化API返回的价格
 */
function formatPrice(price = 0, fixed = 2) {
  return (parseInt(price) * 0.01).toFixed(fixed)
}

/**
 * 判断变量是否设置过
 */
function isset(val) {
  return (val != null) && (val != undefined)
}

/**
 * 格式化时间戳
 * @timeStamp 毫秒级时间戳
 * @fmt 转化格式 如 ‘yyyy-MM-dd hh:mm:ss'
 * @return string
 */
function formatDate(timeStamp, fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  if (timeStamp === null || timeStamp === '') {
    return ''
  }
  timeStamp += '' //转化为字符串
  if (timeStamp.length == 10) {
    timeStamp = parseInt(timeStamp) * 1000
  }
  var date = new Date(parseInt(timeStamp))
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return fmt
};

/**
 * url转成超链接
 * @param text
 * @returns {*}
 */
function hyperlink(textereaContext) {
  if (textereaContext !== null) {
    textereaContext = httpUrl(textereaContext)
    textereaContext = textereaContext.replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029)/g, '<br>')
    if (textereaContext.indexOf('href=www.') > -1) {
      textereaContext = textereaContext.replace("href=www.", "href=http://www.")
    }
    return textereaContext
  }
  function httpUrl(string) {
    var reg = /(www|http:\/\/|http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    return string.replace(reg, "<a href=$1$2>$1$2</a>").replace(/\n/g, "<br />")
  }
}

/**
 * talkingData事件上报
 */
function cnzzEvent(obj) {
  if (typeof (TDAPP) == 'undefined' || !TDAPP || !obj) { // eslint-disable-line
    console.log('没有引入talkingData')
    return
  }
  console.log(JSON.stringify(obj))
  try {
    TDAPP.onEvent(obj.eventId, '', { type: obj.type, userId: storage.userInfo('id') }) // eslint-disable-line
  } catch (e) {
    console.log('事件统计出错！')
  }
}

/**
 * 获取当前手机类型
 */
function getPhoneType() {
  var isAndroid = /Android/i.test(navigator.userAgent)
  var isIOS = /iOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
  if (isAndroid) {
    return 'android'
  } else if (isIOS) {
    return 'ios'
  } else {
    return null
  }
}

/**
 * 验证是否为手机号码
 */
function isMobileNumber(number) {
  return (/^[0-9]+.?[0-9]*$/.test((+number))) && (number.toString().length > 7) && (number.toString().length < 21)
}

/**
 * 验证码方面的错误信息
 *  -510030 | 短信错误
 *  -530002 | 手机号错误
 *  -530410 | 号码过限
 *  -530010 | 短信发送频率过高
 *  -510001 | 未知错误（网络错误)
 */
function smsErrCodeMsg(errCode) {
  var msg = '网络错误'
  switch (errCode) {
    case -510030:
      msg = '短信错误';
      break;
    case -530002:
      msg = '手机号错误';
      break;
    case -530410:
      msg = '发送次数过多';
      break;
    case -530010:
      msg = '发送频率过高';
      break;
    case -510001:
      msg = '未知错误';
      break;
    case -530003:
      msg = '验证码过期, 请重新请求';
      break;
    case -530005:
      msg = '验证码有误, 请重新输入';
      break;
    default:
      msg = '未知错误';
      break;
  }
  return msg;
}

/**
 * 性别 int => string
 */
function gender(val) {
  switch (val) {
    case 0:
      return ''; //未知性别
    case 1:
      return '男';
    case 2:
      return '女';
    default:
      return '';
  }
}

/**
 * 年龄 int => string
 */
function age(month, type) {
  var ret = {
    age: '',
    unit: '',
    str: ''
  };
  if (!!month) {
    var year = Math.floor(month / 12);
    if (year == '0') {
      ret = {
        age: month,
        unit: '个月',
        str: month + '个月'
      };
    } else if (year >= 1 && year <= 2) {
      var elseMonthText = month % 12 == 0 ? '' : (month % 12 + '个月')

      ret = {
        age: year,
        unit: '岁',
        str: year + '岁' + elseMonthText
      }
    } else {
      ret = {
        age: year,
        unit: '岁',
        str: year + '岁'
      };
    }
  }
  return !!type ? ret[type] : ret;
};

// hash去除'#'或者'#/'
function rawHash(hash) {
  if (hash.indexOf('#') == 0) {
    if (hash.indexOf('#/') == 0) {
      return hash.substr(2, hash.length)
    } else {
      return hash.substr(1, hash.length)
    }
  } else {
    return hash
  }
}
/**
 * 云信旧消息的兼容逻辑
 */
function getRichMsgUrl(customData) {
  if (!customData.params || isOwnEmpty(customData.params)) {
    customData.params = {};
    //兼容逻辑
    var id = '';
    console.log(id);
    switch (customData.msgType) {
      case 0: //问诊单
        if (!customData.params.inquiryRecordId) {
          return false
        }
        break;
      case 1: //问诊简报
        if (customData.url) {
          id = customData.url.split('?')[1].split('=')[1];
          customData.params.inquiryReportId = id;
        }
        break;
      case 2: //方案简报:
        if (customData.url) {
          id = customData.url.split('?')[1].split('=')[1];
          customData.params.solutionCode = id;
        }
        break;
      case 3: //门诊信息
        break;
      case 4: //随访单:
        if (customData.url) {
          id = customData.url.split('?')[1].split('=')[1];
          customData.params.followupId = id;
        }
        break;
      case 5: //随访简报:
        if (customData.url) {
          id = customData.url.split('?')[1].split('=')[1];
          customData.params.followupId = id;
        }
        break;
      default:
        break;
    }

    return true;
  }

  /*
   * 检测对象是否是空对象(不包含任何可读属性)。
   * 方法只既检测对象本身的属性，不检测从原型继承的属性。
   */
  function isOwnEmpty(obj) {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    return true;
  }
}

/**
 * 获得Ali Oss不同大小的图片URL
 * url: 图片地址
 * size: 120, 240, 720, 2k; 如果size不设置,则显示原图url
 */
function imgTrim(url, size) {
  if (typeof url == 'undefined' || url === null) {
    return '';
  }
  if (!size) {
    return getRawImgUrl(url);
  } else {
    size = size.toString();
    var range = ['120', '240', '720', '2k'];
    if (range.indexOf(size) < 0) {
      console.log(size + '不在合法范围内：' + range.toString());
    }
    if (url.indexOf('dajiazhongyi.com') > 0) {
      return getRawImgUrl(url) + '!lw-' + size;
    } else {
      return url;
    }
  }

  function getRawImgUrl(url) {
    if (url.indexOf('dajiazhongyi.com') > 0) {
      var sp = '!lw-';
      return url.split(sp)[0];
    } else {
      return url;
    }
  }
}

function transTime(time) {
  var check = getDayPoint(new Date());
  if (time >= check[0]) {
    return dateFormat(time, "HH:mm")
  } else if (time < check[0] && time >= check[1]) {
    return dateFormat(time, "MM-dd HH:mm")
  } else {
    return dateFormat(time, "yyyy-MM-dd HH:mm")
  }

  function getDayPoint(time) {
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    time.setHours(0);
    var today = time.getTime();
    time.setMonth(1);
    time.setDate(1);
    var yearDay = time.getTime();
    return [today, yearDay];
  }

  function dateFormat(_time, _format, _12time) {
    var _map = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g }
    var _12cc = ['上午', '下午']
    var _12ec = ['A.M.', 'P.M.']
    var _week = ['日', '一', '二', '三', '四', '五', '六']
    var _cmon = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    var _emon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    var _fmtnmb = function (_number) {
      _number = parseInt(_number) || 0;
      return (_number < 10 ? '0' : '') + _number;
    }
    var _fmtclc = function (_hour) {
      return _hour < 12 ? 0 : 1;
    }
    if (!_time || !_format) {
      return ''
    }
    _time = new Date(_time);
    _map.yyyy = _time.getFullYear();
    _map.yy = ('' + _map.yyyy).substr(2);
    _map.M = _time.getMonth() + 1;
    _map.MM = _fmtnmb(_map.M);
    _map.eM = _emon[_map.M - 1];
    _map.cM = _cmon[_map.M - 1];
    _map.d = _time.getDate();
    _map.dd = _fmtnmb(_map.d);
    _map.H = _time.getHours();
    _map.HH = _fmtnmb(_map.H);
    _map.m = _time.getMinutes();
    _map.mm = _fmtnmb(_map.m);
    _map.s = _time.getSeconds();
    _map.ss = _fmtnmb(_map.s);
    _map.ms = _time.getMilliseconds();
    _map.w = _week[_time.getDay()];
    var _cc = _fmtclc(_map.H);
    _map.ct = _12cc[_cc];
    _map.et = _12ec[_cc];
    if (!!_12time) {
      _map.H = _map.H % 12;
    }
    return _$encode(_map, _format);
  }

  function _$encode(_map, _content) {
    _content = '' + _content;
    if (!_map || !_content) {
      return _content || '';
    }
    return _content.replace(_map.r, function ($1) {
      var _result = _map[!_map.i ? $1.toLowerCase() : $1];
      return _result != null ? _result : $1;
    })
  }
}

/**
 * 判断当前时间是否不在医生服务时间之内
 */
function isInServiceSleeptingTime(beginTime, endTime) {
  if (!beginTime || !endTime) {
    return false
  }

  var date = new Date()
  var h = date.getHours()
  var m = date.getMinutes()
  var ret = null
  if (m < 10) {
    m = '0' + m
  }
  var nowInt = parseInt(h + '' + m)
  var btInt = parseInt(beginTime.split(':').join(''))
  var etInt = parseInt(endTime.split(':').join(''))
  if (btInt > etInt) {
    //跨过00:00的
    if (btInt <= nowInt && nowInt <= 2400) {
      ret = true
    } else if (nowInt >= 0 && nowInt <= etInt) {
      ret = true
    } else {
      ret = false
    }
  } else {
    //没有跨过00:00
    if (btInt <= nowInt && nowInt <= etInt) {
      ret = true
    } else {
      ret = false
    }
  }
  return ret
}

/**
 * 判断是否支付，是否购药，是否可以购药
 * @state int
 * 0：未支付，未购药，可购药；
 * 1：未支付，未购药，不可购药；
 * 2：已支付，未购药，可购药；
 * 3：已支付，已购药，可购药；
 * 4：已支付，未购药，不可购药；
 * 5：已支付，已购药，不可购药;
 * 6：已支付, 药店拒单, 可购药；
 * 7：已支付, 药房拒单, 不可购药
 * @_type int 判断类别 1 是否支付 2 是否之前买过药 3 是否现在可以购药
 */
function checkSolutionStatus(state, type) {
  let ret = false;
  if (type == 1) {
    ret = !((state == '0' || state == '1'));
  } else if (type == 2) {
    ret = !!((state == '3' || state == '5' || state == '6' || state == '7'));
  } else if (type == 3) {
    ret = !!((state == '0' || state == '2' || state == '3' || state == '6'));
  }
  return ret;
};

/**
 * 解析URL中dj_from的参数值
 * @param t
 * @returns {boolean}
 */
function locationDjFrom(t) {
  var arr = ['template', 'native']
  var v = decodeURIComponent(t)
  if (arr.indexOf(v) == -1 && v.indexOf('#/') == 0) {
    location.hash = v
    return true
  } else {
    return false
  }
}

//省市区显示
function getPosition(workingProvince, workingCity) {
  var _province = workingProvince === null ? '-' : workingProvince
  var _city = workingCity === null ? '-' : workingCity

  if (_province === '-' && _city === '-') {
    return ''
  } else {
    if (_province === _city) {
      return _province
    } else {
      var mar = _province + ' | ' + _city

      if (_province !== '-' && _city !== '-') {
        mar = mar.replace('|', '')
        return mar
      } else {
        // console.log('3', mar)
        if (mar.indexOf('|') > -1) {
          // mar = mar.replace('-', '')
          mar = mar.replace('|', '')
          mar = mar.replace('-', '')
        }
        return mar
      }
    }
  }
}

/**
 * 根据订单返回的状态，显示订单信息
 * @state int
 *   '－110':'拒签'
 *   '－11':'药店已拒单'
 *   '－10':'返回修改'
 *   '－5':'待支付'
 *   '－3':'已退款'
 *   '－2':'已取消，退款中'
 *   '－1':'已取消'
 *   '0':'已支付'
 *   '10':'等待药店接单'
 *   '11':'药店正在配药'
 *   '100':'药店已发货'
 *   '110':'已签收'
 */
function orderStatus(state) {
  if (state == -1 || state == -2 || state == -3 || state == -10 || state == -110) {
    return '已取消'
  } else if (state == -5) {
    return '订单尚未完成支付'
  } else if (state == 0 || state == 10) {
    return '已支付'
  } else if (state == -11) {
    return '药房已拒单'
  } else if (state == 11) {
    return '药房已接单'
  } else if (state == 100) {
    return '已发货'
  } else if (state == 110) {
    return '已签收'
  } else {
    return null
  }
}

// 深拷贝
function deepClone(obj) {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (e) {
    console.error('深拷贝出错:', e)
  }
}

//问诊单问题 => 问诊单题目和答案
function getInquiryAnswersTemplate(inquiryTemplate) {
  let ret = deepClone(inquiryTemplate)
  let sections = ret.sections
  for (let i = 0; i < sections.length; i++) {
    let questions = sections[i].questions
    for (let j = 0; j < questions.length; j++) {
      switch (questions[j].type) {
        case 1:
        case 2:
        case 3:
          questions[j].answers = []
          break;
        case 4:
          questions[j].answer = ""
          break;
      }
    }
  }
  return ret
}

/**
 * 分享医生卡片
 * doctorObj需包含的属性：[doctorId, name, avatar, gender]
 */
function shareDoctorCard(doctorObj, callback = null) {
  let link = config.baseHost + '/main.html?#/doctorDetail/doctorId=' + doctorObj.doctorId + '&recommendId=' + storage.tokenInfo('id')
  let opt = {
    title: '诚意推荐好中医: ' + doctorObj.name + '医师',
    link: link,
    imgUrl: doctorObj.avatar || config.baseHost + '/wx/images/logo.jpg',
    doctorObj: doctorObj,
  }

  wx.action('shareTimeLine', opt, function (res) {
    //测试医生名片信息是否完善
    checkDoctorInfo(doctorObj)
    callback && callback(res)
  })

  let ta = gender(doctorObj.gender)
  opt['desc'] = '通过【大家健康】微信公众号直接关注' + doctorObj.name + '，向' + ta + '发起在线咨询'
  wx.action('shareMessage', opt, function (res) {
    //测试医生名片信息是否完善
    checkDoctorInfo(doctorObj)
    callback && callback(res)
  })

  function gender(id) {
    switch (id) {
      case 0:
        return 'TA'; //未知性别
      case 1:
        return '他';
      case 2:
        return '她';
      default:
        return 'TA';
    }
  }
  //检测医生信息是否完整
  function checkDoctorInfo(doctorObj) {
    if (doctorObj == null || doctorObj.doctorId == null || doctorObj.name == null || doctorObj.gender == null) {
      console.error('名片中医生信息有误', doctorObj)
      var content = JSON.stringify(doctorObj);
      content += localStorage.getItem('userInfo');
      api.errorReport(content, 'ShareFail');
    }
  }
}

/**
 * 患教文章分享
 */
function shareEducation(obj, callback = null) {
  var link = config.baseHost + '/main.html?#/education/patientEducationId=' + obj.patientEducationId + '&type=' + obj.type + '&doctorId=' + obj.doctorId + '&recommendId=' + storage.tokenInfo('id') + '&dj_from=native'
  var opt = {
    title: obj.content.title,
    link: link,
    imgUrl: obj.avatar || config.baseHost + '/wx/images/logo.jpg'
  }
  // console.error('help shareEducation', opt);
  wx.action('shareTimeLine', opt, function (res) {
    callback && callback(res)
  })

  opt['desc'] = obj.content.remark || '关注【大家健康】微信公众号，查看更多文章详情'
  wx.action('shareMessage', opt, function (res) {
    callback && callback(res)
  })
}

//检测是否患者档案信息完备
function checkPatientDocInfoComplete(patientDocInfo) {
  if (patientDocInfo.birth != null &&
    patientDocInfo.name != null &&
    patientDocInfo.height != null &&
    patientDocInfo.weight != null &&
    patientDocInfo.medicalHistory != null &&
    patientDocInfo
  ) {
    return true
  } else {
    return false
  }
}

//判断是否为空对象
function isEmptyObject(obj) {
  if (obj instanceof Object) {
    for (let i in obj) {
      return false
    }
    return true
  } else {
    return false
  }
}
export default {
  getVerifyTypeAlias,
  getVerifyTitle,
  getParams,
  paramsStr,
  formatPrice,
  isset,
  formatDate,
  hyperlink,
  cnzzEvent,
  getPhoneType,
  isMobileNumber,
  smsErrCodeMsg,
  gender,
  age,
  rawHash,
  getRichMsgUrl,
  imgTrim,
  transTime,
  isInServiceSleeptingTime,
  checkSolutionStatus,
  locationDjFrom,
  getPosition,
  orderStatus,
  deepClone,
  getInquiryAnswersTemplate,
  shareDoctorCard,
  shareEducation,
  checkPatientDocInfoComplete,
  isEmptyObject,
}
