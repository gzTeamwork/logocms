const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute,
    second
  ].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

Date.prototype.Format = function(fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
    .substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (
      RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
      .length)));
  return fmt;
}

/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages() //获取加载的页面
  console.log(pages);
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route || currentPage.__route__ //当前页面url
  return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

function getUser() {
  let user = wx.getStorageSync('userInfo') || null
  if (!user) {
    wx.getUserInfo({
      success: res => {
        user = JSON.parse(res.rawData)
      }
    })
    return user
  }
  return user
}

function get3rd() {
  return wx.getStorageSync('session_3rd') || null;
}

// 显示繁忙提示
function showBusy(text) {

  wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
  })
}

// 显示成功提示
function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

// 显示失败提示
function showModel(title, content) {
  wx.hideToast();

  wx.showModel({
    title,
    content: JSON.stringify(content),
      showCancel: false
  })
}



module.exports = {
  formatTime: formatTime,
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  getUser: getUser,
  showBusy: showBusy,
  showSuccess: showSuccess,
  showModel: showModel,
  get3rd: get3rd,
}
