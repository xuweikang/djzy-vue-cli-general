import jsonsql from "jsonsql"

/**
 * userInfo,
 * tokenInfo,
 * patientDocs,
 */
class Storage {
  //初始化userInfo
  initUserInfo(data){
    localStorage.userInfo = data
  }
  //初始化tokenInfo
  initTokenInfo(data){
    localStorage.tokenInfo = data
  }
  //初始化patientDocs
  initPatientDocs(data){
    localStorage.patientDocs = data
  }

  //鉴权信息是否完备
  isAuthComplete(){
    return localStorage.userInfo && localStorage.tokenInfo && localStorage.patientDocs
  }

  userInfo(key) {
    if (!localStorage.userInfo) {
      return null
    }
    var userInfo = JSON.parse(localStorage.userInfo)
    if (arguments.length == 0) {
      return userInfo
    } else {
      return userInfo[key]
    }
  }

  tokenInfo(key) {
    if (!localStorage.tokenInfo) {
      return null
    }
    var tokenInfo = JSON.parse(localStorage.tokenInfo)
    if (arguments.length == 0) {
      return tokenInfo
    } else {
      return tokenInfo[key]
    }
  }

  patientDoc(patientDocId) {
    if (!localStorage.patientDocs) {
      return null
    }
    var _value = JSON.parse(localStorage.patientDocs)
    if (arguments.length == 0) {
      //默认获得本人档案
      return jsonsql(_value, '* where relation=本人')[0]
    } else {
      //获得对应patientDocId的档案信息
      return jsonsql(_value, '* where id=' + patientDocId)[0]
    }
  }

  allPatientDocs() {
    if (!localStorage.patientDocs) {
      return null
    }
    return JSON.parse(localStorage.patientDocs)
  }
  /**
   * 设置患者档案详情 (增／改)
   */
  setPatientDoc(data) {
    var _value = JSON.parse(localStorage.patientDocs)
    var update = false
    if (!data || !data.id) {
      return false
    } else {
      for (var i = 0; i < _value.length; i++) {
        if (_value[i].id == data.id) {
          update = true
          for (var p in data) {
            if (p == 'otherHistory' || p == 'residentProvince') { // 选填部分可以为空
              _value[i][p] = data[p]
            } else {
              _value[i][p] = data[p] || _value[i][p]
            }
          }
          break
        }
      }
      if (update == false) {
        //新增患者档案到本地
        _value.push(data)
      }
      localStorage.setItem('patientDocs', JSON.stringify(_value))
      return true
    }
  }

  setUser(data) {
    var userInfo = JSON.parse(localStorage.userInfo)
    userInfo.phone = data.phone || userInfo.phone
    userInfo.gender = data.gender || userInfo.gender
    userInfo.internationalAreaCode = data.internationalAreaCode || userInfo.internationalAreaCode
    localStorage.userInfo = JSON.stringify(userInfo)
  }
}

export default new Storage()
