/*
 * @Author: Azusakuo 
 * @Date: 2017-11-13 09:52:47 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-11-13 11:35:26
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

        // wxHelper.weixin_get_session_3rd(app);
        // app.globalData.serverUrl = Config.serverUrl;

        /**
         * @deprecated 本段登录检查代码已经被搬迁到wxHelper中,下个版本即将删除
         * 
         */
        //  3rd过期检查
        // let session_3rd = wx.getStorageSync('session_3rd') || false;
        // if (false == session_3rd) {
        //     console.log('3rd过期检查 : ' + session_3rd);
        //     //3rd过期则需要重新换取3rd
        // }
        // let checkPromise = Utils.promise(wx.checkSession);

        // checkPromise()
        //     .then(check_res => {
        //         console.log('微信checkSession未过期');
        //         console.log(check_res);
        //     })
        //     .catch(check_catch => {
        //         console.log('微信过期,需要拉起登录');
        //     });

        // Utils.promise(wx.login)().then(login_res => {
        //     let code = login_res['code'];
        //     console.log('成功获取微信登录信息');
        //     console.log(login_res);
        //     Utils.promise(wx.getUserInfo)().then(getUserInfo_res => {
        //         console.log('成功获取用户信息');
        //         console.log(getUserInfo_res);
        //         let rawData = getUserInfo_res['rawData'];
        //         let signature = getUserInfo_res['signature'];
        //         let encryptData = getUserInfo_res['encryptData'];
        //         let encryptedData = getUserInfo_res['encryptedData'];
        //         //注意是encryptedData不是encryptData...坑啊
        //         let iv = login_res['iv'];
        //         wx.setStorageSync('userInfo', getUserInfo_res['userInfo']);
        //         app.globalData.userInfo = getUserInfo_res['userInfo'];
        //         let serverCheckLoginPromise = Utils.promise(wx.request);
        //         serverCheckLoginPromise({
        //             url: Config.serverUrl() + 'check_login',
        //             data: {
        //                 code: code,
        //                 rawData: rawData,
        //                 signature: signature,
        //                 encryptData: encryptData,
        //                 iv: iv,
        //                 encryptedData: encryptedData
        //             }
        //         }).then(checkLogin_res => {
        //             console.log('成功与服务器交互,获取openid');
        //             console.log(checkLogin_res);
        //             if (checkLogin_res.statusCode != 200 || checkLogin_res.data.code != 1) {
        //                 wx.showModal({
        //                     title: '登录失败'
        //                 });
        //             } else {
        //                 //  登录成功 - 缓存session_3rd与openid作为后续所有请求的凭证
        //                 wx.setStorage({
        //                     key: 'session_3rd',
        //                     data: checkLogin_res.data.content.session_3rd
        //                 });
        //                 wx.setStorage({
        //                     key: 'openid',
        //                     data: checkLogin_res.data.content.openid
        //                 });
        //             }
        //             // 数据准备完毕,刷新页面
        //             // let curPage = Utils.getCurrentPageUrl();
        //             let curUrl = Utils.getCurrentPageUrl();
        //             console.log(curUrl);
        //             app.globalData.ready = true;
        //             wx.reLaunch({
        //                 url: '/' + curUrl
        //             });
        //         });
        //     });
        // });
    },
    globalData: {
        userInfo: null,
        isReady:false
    }
});