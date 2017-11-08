//app.js
let Config = require('./pages/index/config.js')

App({
  onLaunch: function() {
    wx.showLoading({
      title: '准备中..',
    })

    let app = this
      // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //  3rd过期检查
    let session_3rd = wx.getStorageSync('session_3rd') || false
    console.log('3rd过期检查' + session_3rd)
      // 登录
    wx.login({
      success: function(res) {
        //  1.发送 res.code 到后台
        let code = res['code'];
        //  3.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.getUserInfo({
          success: function(info) {
            let rawData = info['rawData'];
            let signature = info['signature'];
            let encryptData = info['encryptData'];
            let encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData...坑啊
            let iv = info['iv'];
            let user = JSON.parse(info.rawData)
              // console.log(user);

            wx.setStorageSync('userInfo', user)
            app.globalData.userInfo = info.userInfo
              // 可以将 res 发送给后台解码出 unionId
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              //  4.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
              // if (session_3rd) {
              //   return session_3rd;
              // }
            wx.request({
              url: Config.serverUrl() + 'check_login',
              data: {
                "code": code,
                "rawData": rawData,
                "signature": signature,
                "encryptData": encryptData,
                'iv': iv,
                'encryptedData': encryptedData
              },
              success: function(res) {
                // console.log(res);
                if (res.statusCode != 200 || res.data.code !=
                  1) {
                  wx.showModal({
                    title: '登录失败'
                  });
                } else {
                  //  登录成功 - 缓存各种数据,特别是3rd
                  wx.setStorage({
                    key: 'session_3rd',
                    data: res.data.content.session_3rd,
                  })
                  wx.setStorage({
                    key: 'openid_client',
                    data: res.data.content.openid_client,
                  })
                }
              }
            });
          }
        });

      }
    })
  },
  onShow: function() {
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)
  },
  globalData: {
    userInfo: null
  }
})
