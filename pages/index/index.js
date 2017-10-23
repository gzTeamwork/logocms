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
  },
  //  套餐改变
  designSetChange(e) {
    this.inputEvent(e)
    var setVis = designSetArray[e.detail.value]
    console.log(setVis);
    //  轮询套餐下的vi项,设置对应的tof
    for (let i = 0; i < viItems.length; i++) {
      let key = findArray(setVis, viItems[i].name);
      key > -1 ? console.log(viItems[i]) : ''
      viItems[i].checked = (key > -1);
    }


    // for (let i = 0; i <= setVis.vis.length + 1; i++) {
    //   let key = findArray(viItems, { id: setVis.vis[i] });
    //   if (key !== -1) {
    //     console.log(viItems[key])
    //     viItems[key].checked = true
    //   } else {
    //     viItems[key].checked = false
    //   }
    // }
    console.log(viItems)
    this.viItemsChange({ target: { id: 'vi_item' }, detail: { value: setViitems } })
  },
  //  VI项改变
  viItemsChange(e) {
    // this.inputEvent(e);
    // console.log(e.target.dataset.price)
    // console.log(e.detail.value.length)
    // let total = 0;
    // for (let i = 0; i < e.detail.value.length; i++) {
    //   var vi = findArray(viItems, { name: e.detail.value[i] })
    //   total = total + parseInt(viItems[vi].price)
    // }
    // // 汇总报价
    // var fromData = this.data.fromData
    // fromData[5].value = total;
    // this.setData({ fromData: fromData })
  },
  //  提交Logo表单
  bindFromSubmit() {
    console.log(this.data.fromData)
  },
  //  直接联系拨打电话
  bindContactUs() {
    wx.makePhoneCall({
      phoneNumber: '13828471634'
    })
  },
  viItemChange(e) {
    console.log(e)
  },
  //事件处理函数
  onLoad: function () {
    var fromData = this.data.fromData
    fromData[2].value = viItems
    this.setData({ fromData: fromData })
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
var designSetArray = [{ name: 'Logo设计套餐A', vis: [2, 3, 4] }, { name: 'Logo设计套餐B', vis: [2, 3, 4, 5, 6, 7] }, { name: 'VIS设计套餐', vis: [2, 3, 4, 5, 6, 7, 8, 17] }];
var viItems = [{
  id: '2',
  name: '标志墨稿',
  price: '200',
  checked: true
},
{
  id: '3',
  name: '标志反白图',
  price: '200',
  checked: true
},
{
  id: '4',
  name: '标志标准制图',
  price: '200',
  checked: true
},
{
  id: '5',
  name: '标志方格制图',
  price: '200',
  checked: true
},
{
  id: '6',
  name: '标志比例限定',
  price: '200',
  checked: true
},
{
  id: '7',
  name: '标志色彩展示',
  price: '200',
  checked: true
},
{
  id: '16',
  name: '企业标准色',
  price: '200',
  checked: true
},
{
  id: '17',
  name: '辅助色系列',
  price: '200',
  checked: true
},
{
  id: '#',
  name: '辅助图形',
  price: '300',
  checked: true
},
{
  id: '#',
  name: '名片',
  price: '300',
  checked: true
},
{
  id: '4',
  name: '信封',
  price: '200',
  checked: true
},
{
  id: '8',
  name: '信纸',
  price: '200',
  checked: true
},
{
  id: '#',
  name: 'PPT模板',
  price: '300',
  checked: true
},
{
  id: '#',
  name: '工号牌',
  price: '300',
  checked: true
},
{
  id: '#',
  name: '工作证',
  price: '300',
  checked: true
},
{
  id: '77',
  name: '标识伞',
  price: '300',
  checked: true
},
{
  id: '#',
  name: '标识牌',
  price: '300',
  checked: true
},
{
  id: '16',
  name: '合同书范本',
  price: 200,
  checked: true
}]

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