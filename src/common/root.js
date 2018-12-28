(function (doc, win) {
  var docEl = doc.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= 480) {
      docEl.style.fontSize = '60px'
    } else if (clientWidth >= 375) {
      docEl.style.fontSize = '50px'
    } else {
      docEl.style.fontSize = 50 * (clientWidth / 375) + 'px'
      //375 50
    }
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
