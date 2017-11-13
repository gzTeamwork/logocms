let Config = require('./../pages/index/config');
let Utils = require('./util');

let weixin_get_session_3rd = function() {
    let result = [];
    let loginPromise = Utils.promise(wx.login);
    loginPromise().then(login_res => {
        let code = login_res['code'];
        console.log('成功获取微信登录信息');
        console.log(login_res);
        //	获取了js_code
        Utils.promise(wx.getUserInfo)().then(getUserInfo_res => {
            console.log('成功获取用户信息');
            console.log(getUserInfo_res);
            let rawData = getUserInfo_res['rawData'];
            let signature = getUserInfo_res['signature'];
            let encryptData = getUserInfo_res['encryptData'];
            let encryptedData = getUserInfo_res['encryptedData'];
            //注意是encryptedData不是encryptData...坑啊
            let iv = login_res['iv'];
            wx.setStorageSync('userInfo', getUserInfo_res['userInfo']);
            // app.globalData.userInfo = getUserInfo_res['userInfo'];
            result['userInfo'] = getUserInfo_res['userInfo'];
            let serverCheckLoginPromise = Utils.promise(wx.request);
            serverCheckLoginPromise({
                url: Config.serverUrl() + 'check_login',
                data: {
                    code: code,
                    rawData: rawData,
                    signature: signature,
                    encryptData: encryptData,
                    iv: iv,
                    encryptedData: encryptedData
                }
            }).then(checkLogin_res => {
                console.log('成功与服务器交互,获取openid');
                console.log(checkLogin_res);
                if (checkLogin_res.statusCode != 200 || checkLogin_res.data.code != 1) {
                    wx.showModal({
                        title: '登录失败'
                    });
                } else {
                    //  登录成功 - 缓存session_3rd与openid作为后续所有请求的凭证
                    wx.setStorage({
                        key: 'session_3rd',
                        data: checkLogin_res.data.content.session_3rd
                    });
                    wx.setStorage({
                        key: 'openid',
                        data: checkLogin_res.data.content.openid
                    });
                    result['session_3rd'] = checkLogin_res.data.content.session_3rd;
                    result['openid'] = checkLogin_res.data.content.session_3rd;
                }
                // 数据准备完毕,刷新页面
                // let curUrl = Utils.getCurrentPageUrl();
                // console.log('刷新当前页面' + curUrl);
                let app = getApp();
                app.globalData.isReady = true;
                return true;
                // wx.reLaunch({
                //     url: '/' + curUrl
                // });
            });
        });
    }).catch(login_catch => {
            console.log(login_catch);
            setTimeout(_ => {
                    weixin_get_session_3rd();
                }, 1500
            );
    });
return false;

};

let helper = {
    dataReady: weixin_get_session_3rd
};

module.exports = helper;