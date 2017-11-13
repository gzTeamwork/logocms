let utils = require('../../../../utils/util');
let wxHelper = require('../../../../utils/wxHelper');
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        //  强制ready
        isReady: {
            type: Boolean,
            observer: (nv, ov) => {
                if (nv != ov) {
                    this.setData({
                        already: nv
                    });
                }
            }
        }
    },
    data: {
        already: false,
    },
    created() {
        wx.showLoading({
            title: '准备中..',
            mask: 1,
        });
        let app = getApp();
        if (!app.globalData.isReady) {
            wxHelper.dataReady();
        }
    },
    ready() {
        let self = this;
        let dataReadyListener = setInterval(function() {
            if (self.checkReady()) {
                clearInterval(dataReadyListener);
                wx.hideLoading();
            }
        }, 2000);
    },
    methods: {
        checkReady: function() {
            let self = this;
            let app = getApp();
            console.log(app.globalData);
            if (app.globalData.isReady) {
                self.setData({
                    already: true,
                });
            }
            return app.globalData.isReady;
        }
    }
});