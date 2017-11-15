/*
 * @Author: Azusakuo 
 * @Date: 2017-11-13 09:52:47 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-11-15 09:38:55
 */
//app.js
// let Config = require('./pages/index/config.js');
// let Utils = require('./utils/util.js');
// let wxHelper = require('./utils/wxHelper');
App({
    onLaunch: function(options) {
        console.log(options);
        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
    },
    globalData: {
        userInfo: null,
        isReady: false
    }
});