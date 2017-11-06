//获取应用实例
const app = getApp()

let Config = require('config.js')
let Units = require('./../../utils/util.js')

//  服务器接口
let serverUrl = Config.serverUrl();
//  获取设计套餐数据
var designSetArray = Config.designSets();
//  vi项
let viItems = Config.viItems()
//  表单提交数组
var fromParams = {}

Page({
  data: {
    userInfo: {},
    currentUrl: '',
  },
  onLoad: function () {
    console.log('loading..')
    let app = this;
    let userInfo = {};
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        userInfo = JSON.parse(res.rawData);
        app.setData({
          userInfo: userInfo,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.setData({
      currentUrl: Units.getCurrentPageUrl(),
    })
  }, onShow: function () {
    console.log('showing...')

  },
  itemTouch(e) {
    console.log(e)
  }
})