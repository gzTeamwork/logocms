//获取应用实例
const app = getApp();

const Config = require('./config.js');
const Utils = require('./../../utils/util.js');
//  服务器接口
const serverUrl = Config.serverUrl();
//  获取设计套餐数据
const designSetArray = Config.designSets();
//  vi项
// const viItems = Config.viItems();
Page({
  data: {
    totals: 0,
    // isReady:false,
    unfinishedList: [],
    userInfo: {},
    screenWidth: 0,
    sliderId: 0,
    currentSlider: '',
    currentUrl: '',
    extraList: [],
    lastSubmitExpire: 0,
  },
  onLoad: function (options) {
    console.log(options);
    let currentUrl = Utils.getCurrentPageUrl();
    let systemInfo = wx.getSystemInfoSync();
    let lastSubmit = wx.getStorageSync('recentSubmitExpire') || 0;
    if (lastSubmit == 0) {
      lastSubmit = '最近没有提交记录'
    } else {
      lastSubmit = new Date(parseInt(lastSubmit) * 1000).Format('yyyy-MM-dd hh:mm:ss');

    }
    this.setData({
      currentUrl: currentUrl,
      screenWidth: systemInfo.windowWidth,
      lastSubmitExpire: lastSubmit
    });
  },

  onShow: function () {
    let self = this;

    console.log('用户页面显示');

    //  初始化页面数据
    let user = Utils.getUser();
    self.setData({
      userInfo: user || app.globalData.userInfo,
      designSetArray: designSetArray,
    });

    let srd = Utils.get3rd();
    let openid = wx.getStorageSync('openid');
    let selfPromise = Utils.promise(wx.request);
    selfPromise({
      url: serverUrl + 'get_user_submits',
      data: {
        session_3rd: srd,
        openid: openid,
      }
    }).then(res => {
      if (res.data.code == 1) {
        let finished = [];
        let unfinished = [];
        let extraed = [];
        for (let i in res.data.content) {
          let designItem = res.data.content[i];
          if (parseInt(designItem.status) === 1) {
            finished.push(desginItemHandle(designItem));
          } else if (parseInt(designItem.status) === 0) {
            unfinished.push(desginItemHandle(designItem));
          } else {
            extraed.push(desginItemHandle(designItem));
          }
        }
        self.setData({
          unfinishedList: unfinished,
          finishedList: finished,
          extraList: extraed,
          // isReady:true,
          totals: unfinished.length + finished.length + extraed.length,
        });
      }
    });
  },
  sliderChange(e) {
    console.log(e);
    this.setData({
      currentSlider: e.currentTarget.id || ''
    });
  },
  itemTouch(e) {
    console.log(e);
  },
  delItemHandle(e) {
    // console.log(e.target.dataset.id + '需求将要被删除');
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '真的要删除吗?',
      success: function (res) {
        if (res.confirm) {
          let requestPromise = Utils.promise(wx.request);
          requestPromise({
            url: serverUrl + 'del_user_submit',
            data: {
              id: e.target.dataset.id,
              session_3rd: Utils.get3rd(),
              openid: Utils.getOpenId(),
            }
          }).then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            });
            if (res.data.code == 1) {
              wx.redirectTo({
                url: '/' + Utils.getCurrentPageUrl()
              });
            }
            console.log(res.msg);
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },
  lookHandle(e) {
    console.log(e);

    wx.redirectTo({
      url: '/pages/index/index?id=' + e.target.dataset.id
    });
  }
});


let desginItemHandle = (item) => {
  //  格式化内容
  item.formData = JSON.parse(item.from_data);
  //  转换时间格式
  item.postTime = new Date(parseInt(item.create_time) * 1000).Format('yyyy-MM-dd');
  return item;
};