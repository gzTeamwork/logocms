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
    totals:0,
    isReady:false,
    unfinishedList: [],
    userInfo: {},
    screenWidth: 0,
    sliderId: 0,
    currentSlider: '',
    currentUrl: '',
    extraList:[],
  },
  onLoad: function(options){
    console.log(options);
    let currentUrl = Utils.getCurrentPageUrl();
    let systemInfo = wx.getSystemInfoSync();
    this.setData({currentUrl:currentUrl,screenWidth: systemInfo.windowWidth,});
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
      url:serverUrl + 'get_user_submits',
      data:{
        session_3rd:srd,
        openid:openid,
      }
    }).then(res=>{
      if (res.data.code == 1) {
        let finished = [];
        let unfinished = [];
        let extraed = [];
        for (let i in res.data.content) {
          let designItem = res.data.content[i];
          if(parseInt(designItem.status) === 1 ){
            finished.push(desginItemHandle(designItem));
          }else if(parseInt(designItem.status) === 0 ) {
            unfinished.push( desginItemHandle(designItem));
          }else{
            extraed.push(desginItemHandle(designItem));
          }
        }
        self.setData({
          unfinishedList: unfinished,
          finishedList:finished,
          extraList:extraed,
          isReady:true,
          totals:unfinished.length+finished.length+extraed.length,
        });
      }
    });

    // //  获取用户未处理项
    // wx.request({
    //   url: serverUrl + 'get_user_submits',
    //   data: {
    //     session_3rd: srd,
    //     status: 0,
    //     openid: openid
    //   },
    //   success: res => {
    //     if (res.data.code == 1) {
    //       let datas = [];
    //       for (let i in res.data.content) {
    //         datas[i] = res.data.content[i];
    //         datas[i].formData = JSON.parse(datas[i].from_data);
    //         datas[i].postTime = new Date(parseInt(datas[i].create_time) * 1000).Format('yyyy-MM-dd');
    //       }
    //       self.setData({
    //         unfinishedList: datas
    //       });
    //     }
    //   },
    //   fail: res => {
    //     console.log(res);
    //     Utils.showModel('错误', '服务器链接失败');
    //   }
    // });
    // //  获取用户已处理项
    // wx.request({
    //   url: serverUrl + 'get_user_submits',
    //   data: {
    //     session_3rd: srd,
    //     status: 1,
    //     openid: openid
    //   },
    //   success: res => {
    //     if (res.data.code == 1) {
    //       let datas = [];
    //       for (let i in res.data.content) {
    //         datas[i] = res.data.content[i];
    //         datas[i].formData = JSON.parse(datas[i].from_data);
    //         datas[i].postTime = new Date(parseInt(datas[i].create_time) * 1000).Format('yyyy-MM-dd');
    //       }
    //       self.setData({
    //         finishedList: datas
    //       });
    //     }
    //   },
    //   fail: res => {
    //     console.log(res);
    //     Utils.showModel('错误', '服务器链接失败');
    //   }
    // });

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
              id: e.detail.datas.id,
              session_3rd: Utils.get3rd(),
              openid: Utils.getOpenId(),
            }
          }).then(res => {
            wx.showToast({title:'删除成功',icon:'success'});
            if (res.data.code == 1) {
              wx.redirectTo({ url: '/'+Utils.getCurrentPageUrl() });
            }
            console.log(res.msg);
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });

  }
});


let desginItemHandle = (item)=>{
  //  格式化内容
  item.formData = JSON.parse(item.from_data);
  //  转换时间格式
  item.postTime = new Date(parseInt(item.create_time)*1000).Format('yyyy-MM-dd');
  return item;
};
