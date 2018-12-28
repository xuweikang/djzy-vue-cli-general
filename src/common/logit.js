/**
 * 记录当前页面的所有console，并保存在consoleLogit
 *
 */
(function () {
  window.console.error = (logit())(window.console.error)
  window.console.log = (logit())(window.console.log)

  window.console.warn = (logit())(window.console.warn)
  function logit() {
    return function(oriLogFunc){ //重写console.log ，存入local storage
      return function(str) {
        oriLogFunc.call(this, str)
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        var time = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
        try {
          if (!!localStorage.getItem('consolePrint')){
            var addLogit = '[' + time + '] ' + '[' + location.hash + '] ' + JSON.stringify(str) + '\n =========== \n'
            var consoleLogit = localStorage.getItem('consolePrint') + addLogit
            localStorage.setItem('consolePrint', consoleLogit)
          } else { //无记录
            var expire = Date.parse(new Date()) + 12 * 60 * 60 * 1000
            localStorage.setItem('consolePrintExpire', expire)
            localStorage.setItem('consolePrint', '[' + time + '] ' + '[' + location.hash + '] ' + JSON.stringify(str) + '\n =========== \n')
          }
        } catch (e){
          localStorage.setItem('consolePrint', '存储localstorage错误：' + e + '\n')
        }
      }
    }
  }
})()
