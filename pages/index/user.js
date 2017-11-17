/*
 * @Author: Azusakuo 
 * @Date: 2017-11-15 09:12:26 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-11-17 10:46:52
 */
//获取应用实例
const app = getApp();

const config = require('./config.js');
const utls = require('./../../utils/util.js');
//  服务器接口
const serverUrl = config.serverUrl();
//  获取设计套餐数据
const designSetArray = config.designSets();
//  vi项
// const viItems = config.viItems();
Page({
    data: {
        totals: 0, //  列表总数 
        unfinishedList: [], //  未完成列表
        extraList: [], //  其他列表
        userInfo: {}, //  用户信息
        screenWidth: 0, //  屏幕宽度
        sliderId: 0, //  被滑动的组件id
        currentSlider: '', //  当前滑动的组件
        currentUrl: '', //  当前页面路径
        lastSubmitExpire: 0, //  上次提交时间
    },
    onLoad: function(options) {
        console.log(options);
        let currentUrl = utls.getCurrentPageUrl();
        let systemInfo = wx.getSystemInfoSync();
        let lastSubmit = wx.getStorageSync('recentSubmitExpire') || 0;
        if (lastSubmit == 0) {
            lastSubmit = '最近没有提交记录';
        } else {
            lastSubmit = new Date(parseInt(lastSubmit) * 1000).Format('yyyy-MM-dd hh:mm:ss');

        }
        this.setData({
            currentUrl: currentUrl,
            screenWidth: systemInfo.windowWidth,
            lastSubmitExpire: lastSubmit
        });
    },

    onShow: function() {
        let self = this;

        console.log('用户页面显示');

        //  初始化页面数据
        let user = utls.getUser();
        let srd = utls.get3rd();
        let openid = wx.getStorageSync('openid');

        app.globalData.session_3rd = srd;
        app.globalData.openid = openid;

        self.setData({
            userInfo: user || app.globalData.userInfo,
            designSetArray: designSetArray,
            srd: srd,
            openid: openid,
        });



        dataHandle(srd, openid, self);

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
            success: function(res) {
                if (res.confirm) {
                    let requestPromise = utls.promise(wx.request);
                    requestPromise({
                        url: serverUrl + 'del_user_submit',
                        data: {
                            id: e.target.dataset.id,
                            session_3rd: utls.get3rd(),
                            openid: utls.getOpenId(),
                        }
                    }).then(res => {
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success'
                        });
                        if (res.data.code == 1) {
                            wx.redirectTo({
                                url: '/' + utls.getCurrentPageUrl()
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
    //  查看条目
    lookHandle(e) {
        console.log(e);
        wx.redirectTo({
            url: '/pages/index/index?id=' + e.target.dataset.id
        });
    },
    //  转发条目
    shareHandle(e) {
        console.log(e);
        wx.showShareMenu({
            withShareTicket: true
        });
    },
    updateUser(e) {
        wx.getUserInfo({
            success: res => {
                console.log(res);

            }
        });
    },
    onShareAppMessage: function(res) {
        let self = this;

        console.log(res);

        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
        }
        return {
            title: self.data.userInfo.nickName + '的Logo设计需求',
            path: '/pages/index/index?id=' + res.target.dataset.id,
            success: function(res) {
                // 转发成功
                wx.showToast({
                    title: '分享成功'
                });
            },
            fail: function(res) {
                // 转发失败
            }
        };
    }
});


let desginItemHandle = (item) => {
    //  格式化内容
    item.formData = JSON.parse(item.from_data);
    //  转换时间格式
    item.postTime = new Date(parseInt(item.create_time) * 1000).Format('yyyy-MM-dd');
    return item;
};

let dataHandle = (srd, openid, self) => {
    let selfPromise = utls.promise(wx.request);
    wx.showLoading({
        title: '更新数据中...'
    });
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
        wx.hideLoading();
    }).catch(res => {
        wx.hideLoading();
        console.log(res);
    });
};