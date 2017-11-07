//获取应用实例
const app = getApp()

let Config = require('config.js')
let Units = require('./../../utils/util.js')

//  服务器接口
let serverUrl = Config.serverUrl();
//  获取设计套餐数据
let designSetArray = Config.designSets();
//  vi项
let viItems = Config.viItems()
//  表单提交数组
let fromParams = {}

// //  引入组件

Page({
  data: {
    userInfo: {},
    currentUrl: '',
    screenWidth: 0,
  },
  onLoad: function () {

  },
  onReady: function () {
    let Apps = this
    console.log('showing...')
    //  获取屏幕宽度
    Apps.setData({
      userInfo:Units.getUser(),
      currentUrl: Units.getCurrentPageUrl(),
    })
  },
  itemTouch(e) {
    console.log(e)
  }
})