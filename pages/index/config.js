module.exports = {
    serverUrl: function(dev = true ) {
        //  服务器接口
        let localServerUrl = 'http://tiramisu.localhost.com/diavision/weixin/';
        let remoteServerUrl =
            'https://design.logods.cn/public/diavision/weixin/';
        return dev ? localServerUrl : remoteServerUrl;
    },
    viItems: function() {
        //  vi项目配置
        return [{
            id: '1',
            name: '标志标准色\n（印刷色）',
            price: 200
        }, {
            id: '2',
            name: '企业辅助色\n（系）',
            price: 200
        }, {
            id: '3',
            name: '标志标准化制图',
            price: 200
        }, {
            id: '4',
            name: '标志墨稿、反白稿',
            price: 200
        }, {
            id: '5',
            name: '标志最小比例限定',
            price: 200
        }, {
            id: '6',
            name: '标志特定色彩效果展示',
            price: 200
        }, {
            id: '7',
            name: '象征图形',
            price: 200
        }, {
            id: '8',
            name: '标志与象征图形组合',
            price: 200
        }, {
            id: '9',
            name: '标志与标准字组合',
            price: 200
        }, {
            id: '10',
            name: '名片',
            price: 200
        }, {
            id: '11',
            name: '信封',
            price: 200
        }, {
            id: '12',
            name: '信纸',
            price: 200
        }, {
            id: '13',
            name: 'PPT模板',
            price: 200
        }, {
            id: '14',
            name: '工号牌',
            price: 200
        }, {
            id: '15',
            name: '工作证',
            price: 200
        }, {
            id: '16',
            name: '标识牌',
            price: 200
        }, {
            id: '17',
            name: '合同书规范',
            price: 200
        }, {
            id: '18',
            name: '便签',
            price: 200
        }, {
            id: '19',
            name: '标识伞',
            price: 200
        }, {
            id: '20',
            name: ' 广告衫',
            price: 200
        }, ];
    },
    designSets: function() {
        return [{
            name: 'Logo设计套餐A',
            vis: [1, 2, 3],
            price: 2680,
            summary: '2*2次标志设计提案\n在选定风格基础上免费修改4次方案\n赠送3个VIS项\n5-7个工作日内初稿\n预计工作周期：15天\n（包含初稿、修改、定稿、规范文件）'
        }, {
            name: 'Logo设计套餐B',
            vis: [1, 2, 3, 4, 5, 6],
            price: 3200,
            summary: '2*3次标志设计提案\n在选定风格基础上免费修改6次方案\n赠送6个VIS项\n下单后5-7个工作日内初稿\n预计工作周期：21天\n（包含初稿、修改、定稿、规范文件）'
        }, {
            name: 'VIS+12项VI设计套餐C',
            vis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            price: 4580,
            summary: '2*4次标志设计提案\n100%满意修改\n12个VIS项 下单后5-7个工作日内初稿\n预计工作周期：19天\n（包含初稿、修改、定稿、规范文件）'
        }, {
            name: 'Logo+20项VI设计套餐D',
            vis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21
            ],
            price: 5980,
            summary: '2*4次标志设计提案\n100%满意修改\n20个VIS项\n下单后5-7个工作日内初稿\n预计工作周期：24天\n（包含初稿、修改、定稿、规范文件）'
        }, ];
    },
    logoStyle: function() {
        return [{
            name: '图标标准字'
        }, {
            name: '图标设计字'
        }, {
            name: '单字体设计'
        }, {
            name: '单图标设计'
        }, {
            name: '图文融合'
        }, {
            name: '图标含文字'
        }];
    }
};
