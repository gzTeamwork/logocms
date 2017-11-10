//获取应用实例
const app = getApp()

const Config = require('./config.js')
const Utils = require('./../../utils/util.js')
  //  服务器接口
const serverUrl = Config.serverUrl();
//  获取设计套餐数据
const designSetArray = Config.designSets();
//  vi项
const viItems = Config.viItems()
  //  表单提交数组
const fromParams = {}

//  引入组件

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
    if (!app.globalData.ready) {
      wx.showLoading({
        title: '准备中..',
      })
      return false;
    }
    let self = this
    console.log('用户页面显示')

    //  获取屏幕宽度
    let systemInfo = wx.getSystemInfoSync()
    let user = Utils.getUser()
    let currentUrl = Utils.getCurrentPageUrl()
    self.setData({
      userInfo: user || app.globalData.userInfo,
      screenWidth: systemInfo.windowWidth,
      currentUrl: currentUrl,
      designSetArray: designSetArray,
    })

    let srd = Utils.get3rd();
    let openid = wx.getStorageSync('openid')

    //  获取用户未处理项
    wx.request({
        url: serverUrl + 'get_user_submits',
        data: {
          session_3rd: srd,
          status: 0,
          openid: openid
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
          Utils.showModel('错误', '服务器链接失败')
        }
      })
      //  获取用户已处理项
    wx.request({
      url: serverUrl + 'get_user_submits',
      data: {
        session_3rd: srd,
        status: 1,
        openid: openid
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
        Utils.showModel('错误', '服务器链接失败')
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
  },
  delItemHandle(e) {
    // console.log(e.target.dataset.id + '需求将要被删除');
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '真的要删除吗?',
      success: function(res) {
        if (res.confirm) {
          let requestPromise = Utils.promise(wx.request);
          requestPromise({
            url: serverUrl + 'del_user_submit',
            data: {
              id: e.detail.datas.id,
              session_3rd: Utils.get3rd(),
              openid: Utils.getOpenId(),
            }
          }).then(res => {
            console.log(res.msg);
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})
