let tapBegin, tapMove;
//  动画类
let animate = wx.createAnimation({
  duration: 400,
  timingFunction: 'ease'
});
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    //  组件ID
    compId: {
      type: String,
    },
    //  用于组件群分
    isCurrent: {
      type: String,
      observer: function (nv, ov) {
        if (nv != ov) {
          this.sliderOut();
        }
      }
    },
    //  是否拥有侧滑内容
    hasSlider: {
      type: Number,
    },
    //  组件宽度
    width: {
      type: Number
    }
  },
  data: {
    // 这里是一些组件内部数据
    compId: '',
    width: 0,
    height: 96,
    sliderWidth: 0,
    sliderClass: 'slider-hide',
    isCurrent: '',
    sliderAnimate: '',
    hasSlider: 0,
  },
  methods: {
    // 这里是一个自定义方法
    // 滑动开始
    compPlanTap: function (e) {
      console.log(e);
      e.detail.datas = {
        id: e.currentTarget.dataset.id
      };
      this.triggerEvent('compPlanTap', e.detail);
    },
    sliderHover: function (e) {
      console.log(e);
      console.log(this.data.compId + '被滑动了');
      tapBegin = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      };
    },
    //  滑动方向
    sliderOver: function (e) {
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
        .data.sliderClass === 'slider-hide') {
        console.log('向←滑动了,距离:' + (tapBegin.x - tapMove.x));
        animate.translate3d(-this.data.hasSlider * this.data.height, 0, 0).step();
        this.setData({
          sliderAnimate: animate.export(),
          sliderClass: 'slider-show'
        });
      }
      if (tapMove.x > tapBegin.x && (tapMove.x - tapBegin.x) > 20 &&
        self.data.sliderClass === 'slider-show') {
        console.log('向→滑动了,距离:' + (tapBegin.x - tapMove.x));
        animate.translate3d(0, 0, 0).step();
        this.setData({
          sliderAnimate: animate.export(),
          sliderClass: 'slider-hide'
        });
      }
      tapMove = tapBegin;
    },
    sliderEnd: function () { },
    //  失去焦点
    sliderOut: function (e) {
      console.log(this.compId + '被滑出了');
      animate.translate3d(0, 0, 0).step();
      this.setData({
        sliderAnimate: animate.export(),
        sliderClass: 'slider-hide'
      });
    }
  },
  ready: function (e) {
    let self = this;
    //  初始化组件尺寸
    console.log('组件被创建..');
    self.setData({
      height: 96, sliderWidth: parseInt(self.data.hasSlider) * 96
    });
  }
});