//获取应用实例
const app = getApp()

const Config = require('./config.js')
const Units = require('./../../utils/util.js')
  //  服务器接口
const serverUrl = Config.serverUrl();
//  获取设计套餐数据
const designSetArray = Config.designSets();
//  vi项
const viItems = Config.viItems()
  //  表单提交数组
const fromParams = {}

// //  引入组件

Page({
  data: {
    unfinishedList: [],
    userInfo: {},
    screenWidth: 0,
    sliderId: 0,
    currentSlider: '',
    currentUrl: '',
  },
  onShow: function() {
    let self = this
    console.log('showing...')

    //  获取屏幕宽度
    let systemInfo = wx.getSystemInfoSync()
    let user = Units.getUser()
    let currentUrl = Units.getCurrentPageUrl()
    console.log(currentUrl);
    self.setData({
      userInfo: user || app.globalData.userInfo,
      screenWidth: systemInfo.windowWidth,
      currentUrl: currentUrl,
      designSetArray: designSetArray,
    })

    let srd = Units.get3rd();
    let openid_client = wx.getStorageSync('openid_client')

    //  获取用户未处理项
    wx.request({
        url: serverUrl + 'get_user_submits',
        data: {
          session_3rd: srd,
          status: 0,
          openid: openid_client
        },
        success: res => {
          if (res.data.code == 1) {
            let datas = [];
            for (let i in res.data.content) {
              datas[i] = res.data.content[i];
              datas[i].formData = JSON.parse(datas[i].from_data)
              datas[i].postTime = new Date(parseInt(datas[i].create_time) *
                1000).Format(
                "yyyy-MM-dd")
            }
            self.setData({
              unfinishedList: datas
            });
          }
        },
        fail: res => {
          Units.showModel('错误', '服务器链接失败')
        }
      })
      //  获取用户已处理项
    wx.request({
      url: serverUrl + 'get_user_submits',
      data: {
        session_3rd: srd,
        status: 1,
        openid: openid_client
      },
      success: res => {
        if (res.data.code == 1) {
          let datas = [];
          for (let i in res.data.content) {
            datas[i] = res.data.content[i];
            datas[i].formData = JSON.parse(datas[i].from_data)
            datas[i].postTime = new Date(parseInt(datas[i].create_time) *
              1000).Format(
              "yyyy-MM-dd")
          }
          self.setData({
            finishedList: datas
          });
        }
      },
      fail: res => {
        Units.showModel('错误', '服务器链接失败')
      }
    })

  },
  sliderChange(e) {
    console.log(e)
    this.setData({
      currentSlider: e.currentTarget.id || ''
    })
  },
  itemTouch(e) {
    console.log(e)
  }
})
