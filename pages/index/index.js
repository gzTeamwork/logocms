//获取应用实例
const app = getApp();

const Config = require('./config.js');
const utils = require('./../../utils/util.js');
//  服务器接口
const serverUrl = Config.serverUrl();
//  获取设计套餐数据
const designSetArray = Config.designSets();
//  vi项
const viItems = Config.viItems();
//  表单提交数组
var fromParams = {};

Page({
  data: {
    fromData: [{
      name: 'logo_name',
      value: '',
      lebal: 'Logo/商标名称',
      preText: '填写您的项目名称',
      isMust: true,
      model: 'input'
    },
    // { name: 'design_set', lebal: '设计套餐', preText: '请选择您的套餐', isMust: true, model: 'select', value: 0, array: ['Logo设计套餐A', 'Logo设计套餐B', 'VIS设计套餐'] },
    {
      name: 'design_set',
      lebal: '设计套餐',
      preText: '请选择您的套餐',
      isMust: true,
      model: 'select',
      value: 0,
      array: Config.designSets()
    },
    {
      name: 'vi_item',
      value: [],
      lebal: 'VI设计项',
      preText: '请选择您需要的VI设计项目',
      isMust: true,
      model: 'multi'
    },
    {
      name: 'logo_style',
      value: 1,
      lebal: '喜欢的Logo风格',
      preText: '请选择您喜爱的Logo设计风格',
      isMust: true,
      model: 'single',
      array: Config.logoStyle()
    },
    {
      name: 'design_suggest',
      value: '',
      lebal: '设计要求',
      preText: '请详细描述您的设计要求，有助高效完成logo设计',
      isMust: false,
      model: 'textarea'
    },
    {
      name: 'total_price',
      value: 0,
      noLebal: true,
      model: 'total_price'
    },
    {
      name: 'user_name',
      value: '',
      lebal: '您的姓名',
      preText: '请填写您的名字',
      isMust: true,
      model: 'input'
    },
    {
      name: 'user_phone',
      value: '',
      lebal: '您的电话',
      preText: '请填写您的联系方式(手机)',
      isMust: true,
      model: 'input',
      datatype: 'number',
      maxlength: 11
    },
    {
      name: 'user_company',
      value: '',
      lebal: '公司名字',
      preText: '请填写您的公司名',
      isMust: true,
      model: 'input'
    }
    ],
    fromParams: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentUrl: '',
    isSubmit: false,
  },
  //  表单输入事件,同步数据到data
  inputEvent(e) {
    if (e.target.id.length > 1) {
      fromParams[e.target.id] = e.detail.value;
      this.setData({
        fromParams: fromParams
      });
    }
    //  通过轮询fromData,修改对应条目的value值,达到双向绑定
    var fromData = this.data.fromData;
    for (let i = 0; i < fromData.length; i++) {
      if (fromData[i].name == e.target.id) {
        fromData[i].value = e.detail.value;
      }
    }
    this.setData({
      fromData: fromData
    });
    // console.log(e)
  },
  //  套餐改变
  designSetChange(e) {
    this.inputEvent(e);
    var setVis = designSetArray[e.detail.value];
    // console.log(setVis);
    //  轮询套餐下的vi项,设置对应的tof
    for (let i = 0; i < viItems.length; i++) {
      let key = findArray(setVis.vis, viItems[i].id);
      viItems[i].checked = key > -1;
      viItems[i].disable = key > -1;
    }
    // console.log(viItems)
    var fromData = this.data.fromData;
    fromData[2].value = viItems;
    fromData[5].value = designSetArray[e.detail.value].price;
    this.setData({
      fromData: fromData
    });
  },
  //  VI项改变
  viItemsChange(e) {
    var newViItems = e.detail.value;
    var total_price = designSetArray[this.data.fromData[1].value].price;
    // 获取额外增加的vi项
    for (let i = 0; i < viItems.length; i++) {
      if (viItems[i].disable == false) {
        if (findArray(newViItems, viItems[i].name) > -1) {
          total_price = parseInt(total_price) + parseInt(viItems[i].price);
          viItems[i].checked = true;
        } else {
          viItems[i].checked = false;
        }
      }
    }
    var fromData = this.data.fromData;
    fromData[2].value = viItems;
    fromData[5].value = total_price;
    this.setData({
      fromData: fromData
    });
  },
  //  提交Logo表单
  bindFromSubmit(e) {
    fromsubmit(this, e);
  },
  //  直接联系拨打电话
  bindContactUs() {
    wx.makePhoneCall({
      phoneNumber: '13828471634'
    });
  },
  viItemChange(e) {
    console.log(e);
  },
  //  事件处理函数
  onLoad: function () {
    let self = this;


    let fromData = this.data.fromData;
    fromData[2].value = viItems;
    let userInfo = utils.getUser();
    this.setData({
      currentUrl: utils.getCurrentPageUrl(),
      fromData: fromData,
      userInfo: userInfo,
    });
    this.designSetChange({
      target: {
        id: 'design_set'
      },
      detail: {
        value: 0
      }
    });

  },
  onShow() { },
});

function findArray(array, feature, all = true) {
  for (let index in array) {
    let cur = array[index];
    if (feature instanceof Object) {
      let allRight = true;
      for (let key in feature) {
        let value = feature[key];
        if (cur[key] == value && !all) return index;
        if (all && cur[key] != value) {
          allRight = false;
          break;
        }
      }
      if (allRight) return index;
    } else {
      if (cur == feature) {
        return index;
      }
    }
  }
  return -1;
}


//  表单提交检验
function fromsubmit(page) {
  //  检查表单提交时效
  let lastSubTime = wx.getStorageSync('recentSubmitExpire'); //  上次提交缓存的时间
  let now = parseInt(new Date().getTime() / 1000);
  let isExpired = now - lastSubTime;
  // console.log(isExpired)
  if (parseInt(isExpired) < 60) {
    wx.showModal({
      title: '注意',
      content: '距离上次提交需求才不久,是否太急了?',
      showCancel: false
    });
    return false;
  }
  // 获取表单数据
  var fromData = page.data.fromData;
  var params = {};
  params.userInfo = page.data.userInfo;
  for (let key in fromData) {
    if (fromData[key].value.length === 0 && fromData[key].isMust) {
      wx.showModal({
        title: '表单没填完',
        content: '请填写' + fromData[key].lebal,
        showCancel: false,
        complete: function () {
          // wx.pageScrollTo({
          //   scrollTop: fromData[key].,
          // })
        }
      });
      return false;
    }
    params[fromData[key].name] = fromData[key].value;
  }
  wx.showLoading({
    title: '加载中'
  });
  //  表单提交
  params.session_3rd = wx.getStorageSync('session_3rd') || null;
  params.openid = wx.getStorageSync('openid') || null;
  wx.request({
    url: serverUrl + 'design_submit',
    method: 'POST',
    data: params,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      wx.hideLoading();
      if (res.data.code === 1 && res.statusCode === 200) {
        //  数据提交成功
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: '2000',
          mask: 1
        });
        wx.setStorage({
          key: 'recentSubmitExpire',
          data: parseInt(new Date().getTime() / 1000)
        });
        page.setData({
          isSubmit: true
        });
      }
      console.log(res);
    },
    complete: function () {
      setTimeout(_ => {
        wx.hideLoging();
      }, 3000);
    }
  });
}