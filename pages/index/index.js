//index.js
//获取应用实例
const app = getApp()

var fromParams = {}

Page({
  data: {
    fromData: [
      { name: 'logo_name', value: '', lebal: 'Logo/商标名称', preText: '填写您的项目名称', isMust: true, model: 'input' },
      { name: 'design_set', lebal: '设计套餐', preText: '请选择您的套餐', isMust: true, model: 'select', value: 0, array: ['Logo设计套餐A', 'Logo设计套餐B', 'VIS设计套餐'] },
      { name: 'vi_item', value: [], lebal: 'VI设计项', preText: '请选择您需要的VI设计项目', isMust: true, model: 'multi' },
      { name: 'logo_style', value: 1, lebal: '喜欢的Logo风格', preText: '请选择您喜爱的Logo设计风格', isMust: true, model: 'single' },
      { name: 'design_suggest', value: '', lebal: '设计要求', preText: '请详细描述您的设计要求，有助高效完成logo设计', isMust: false, model: 'textarea', },
      { name: 'total_price', value: 0, noLebal: true, model: 'total_price' },
      { name: 'user_name', value: '', lebal: '您的姓名', preText: '请填写您的名字', isMust: true, model: 'input' },
      { name: 'user_phone', value: '', lebal: '您的电话', preText: '请填写您的联系方式(手机)', isMust: true, model: 'input' },
      { name: 'user_company', value: '', lebal: '公司名字', preText: '请填写您的公司名', isMust: true, model: 'input' },
    ],
    setPrice: ['1680', '2680', '3680'],
    fromParams: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //  表单输入事件,同步数据到data
  inputEvent(e) {
    if (e.target.id.length > 1) {
      // var data = this.data.fromParams;
      // data[e.target.id] = e.detail.value
      fromParams[e.target.id] = e.detail.value
      this.setData({ fromParams: fromParams })
    }
    //  通过轮询fromData,修改对应条目的value值,达到双向绑定
    var fromData = this.data.fromData
    for (let i = 0; i < fromData.length; i++) {
      if (fromData[i].name == e.target.id) {
        fromData[i].value = e.detail.value
      }
    }
    if (e.target.id == 'design_set') {
      fromData[5].value = this.data.setPrice[e.detail.value]
      console.log(this.data.setPrice[e.detail.value - 1])
    }
    this.setData({ fromData: fromData })
    console.log(e)
    wx.pageScrollTo({
      scrollTop: e.target.offsetTop - 60
    })
  },
  //  VI项改变
  viItemsChange(e) {
    this.inputEvent(e);
    console.log(fromModule)
  },
  //  提交Logo表单
  bindFromSubmit() {
    wx.showActionSheet({
      itemList: this.data.fromData,
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //  直接联系拨打电话
  bindContactUs() {
    wx.makePhoneCall({
      phoneNumber: '13828471634'
    })
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow() {
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})