// pages/index/post.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postThumb: '', hasTeam: false, caseTeams: [],
  },
  //  案例封面上传
  bindCaseThumbUpload: function () {
    var self = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.setStorage({
          key: "caseUpload",
          data: { "thumb": res.tempFilePaths }
        })
        self.setData({ 'postThumb': res.tempFilePaths });
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },
  //  切换团队输入方式
  bandSwitchHasTeam: function (event) {
    var self = this;
    self.setData({ hasTeam: self.data.hasTeam == true ? false : true });
    console.log(self.data.hasTeam)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.getStorage({
      key: 'caseUpload',
      success: function (res) {
        self.setData({ 'postThumb': res.data.thumb })
      }
    })
    wx.getStorage({
      key: 'caseTeams',
      success: function (res) {
        self.setData({ 'caseTeams': res.data })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})