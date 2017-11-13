let tapBegin, tapMove;
let Utils = require('./../../../../utils/util.js');
let animate = wx.createAnimation({})
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        innerText: {
            type: String,
            value: 'default value',
        },
        mode: {
            type: String,
        },
        w: {
            type: Number,
            value: '100%',
            observer: function(nv, ov) {
                this.setData({
                    W: nv
                });
            }
        },
        compId: {
            type: String,
            observer: function(nv, ov) {
                this.setData({
                    compId: nv
                });
            }
        },
        isCurrent: {
            type: String,
            observer: function(nv, ov) {
                if (nv != ov) {
                    this.sliderOut();
                }
            }
        },
        hasDel: {
            type: Boolean,
        }
    },
    data: {
        // 这里是一些组件内部数据
        compId: '',
        W: 0,
        H: 96,
        boxClass: '',
        isCurrent: '',
        boxAnimate: '',
        hasDel: false,
        defaultClass: '',
    },
    methods: {
        // 这里是一个自定义方法
        // 滑动开始
        compPlanTap: function(e) {
            console.log(e);
            e.detail.datas = {
                id: e.currentTarget.dataset.id
            };
            this.triggerEvent('compPlanTap', e.detail);
        },
        sliderHover: function(e) {
            console.log(e);
            console.log(this.data.compId + '被滑动了');
            tapBegin = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            };
        },
        //  滑动方向
        sliderOver: function(e) {
            let self = this;
            // console.log(e)
            tapMove = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            };
            if (Math.abs(tapMove.y - tapBegin.y) > 20) {
                return false;
            }

            if (tapMove.x < tapBegin.x && (tapBegin.x - tapMove.x) > 20 && self
                .data.boxClass !== 'box-show') {
                console.log('向←滑动了,距离:' + (tapBegin.x - tapMove.x));
                animate.translate3d(-96, 0, 0).step();
                this.setData({
                    boxAnimate: animate.export(),
                    boxClass: 'box-show'
                });
            }

            if (tapMove.x > tapBegin.x && (tapMove.x - tapBegin.x) > 20 &&
                self.data.boxClass === 'box-show') {
                console.log('向→滑动了,距离:' + (tapBegin.x - tapMove.x));
                animate.translate3d(0, 0, 0).step();
                this.setData({
                    boxAnimate: animate.export(),
                    boxClass: 'box-hide'
                });
            }
            tapMove = tapBegin;

        },
        sliderEnd: function() {

        },
        //  失去焦点
        sliderOut: function(e) {
            console.log(this.compId + '被滑出了');
            this.setData({
                boxClass: 'box-hide'
            });
        }
    },
    ready: function(e) {
        console.log('组件被创建..');
    }
});