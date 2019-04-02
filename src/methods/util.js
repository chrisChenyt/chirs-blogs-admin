
// 检查手机号
let checkMobile = function (mobile) {
  // var correctMobile = /^((13[0-9])|(15[^4,\\D])|(18[0,3,5-9]))\\d{8}$/
  var correctMobile = /^1[0-9]{10}$/
  return correctMobile.test(mobile)
}

// iphonex
let iPhone = function () {
  var u = navigator.userAgent, app = navigator.appVersion;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isiOS) {
    var w=window.screen.width * window.devicePixelRatio;
    var h=window.screen.height * window.devicePixelRatio;
    if(w==1125&&h==2436 || w==828&&h==1792 || w==1242&&h==2688){//iPhone X/XS、iPhone XR、iPhone XS Max
      if(window.history.length == 1){
        document.getElementsByTagName('body')[0].className = 'has-bottombar';
      } else{
        document.getElementsByTagName('body')[0].classList.remove("has-bottombar");
      }
    }
  }
}

// 获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
let getNowFormatDate = function (format) {
  const date = new Date();
  var o = {
      'M+' : date.getMonth() + 1, //month
      'd+' : date.getDate(), //day
      'H+' : date.getHours(), //hour
      'm+' : date.getMinutes(), //minute
      's+' : date.getSeconds(), //second
      'q+' : Math.floor((date.getMonth() + 3) / 3), //quarter
      'S' : date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

  for (var k in o)
    if (new RegExp('(' + k + ')').test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return format;
}

// UUID 是 通用唯一识别码（Universally Unique Identifier）
let generateUUID = function () {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

module.exports =  {
  checkMobile,
  iPhone,
  getNowFormatDate,
  generateUUID
}