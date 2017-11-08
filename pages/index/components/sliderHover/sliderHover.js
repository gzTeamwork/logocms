let tapBegin, tapMove, tapOver;

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
    w: {
      type: Number,
      value: '100%',
      observer: function (nv, ov) {
        this.setData({
          W: nv
        })
      }
    },
    compId: {
      type: String,
      observer: function (nv, ov) {
        this.setData({
          compId: nv
        })
      }
    },
    isCurrent: {
      type: String,
      observer: function (nv, ov) {
        if (nv != ov) {
          this.sliderOut()
        }
      }
    }
  },
  data: {
    // 这里是一些组件内部数据
    compId: '',
    W: 0,
    H: 96,
    boxClass: '',
    isCurrent: '',
  },
  methods: {
    // 这里是一个自定义方法
    // 滑动开始
    compPlanTap: function (e) {
      console.log(e)
    },
    sliderHover: function (e) {
      console.log(e)
      console.log(this.data.compId + '被滑动了')
      tapBegin = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
    },
    //  滑动方向
    sliderOver: function (e) {
      let self = this;
      // console.log(e)
      tapMove = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }

      if (tapMove.x < tapBegin.x && (tapBegin.x - tapMove.x) > 10 && self
        .data.boxClass !== 'box-show') {
        console.log('向←滑动了,距离:' + (tapBegin.x - tapMove.x));
        this.setData({
          boxClass: 'box-show'
        })
      }

      if (tapMove.x > tapBegin.x && (tapMove.x - tapBegin.x) > 10 &&
        self.data.boxClass === 'box-show') {
        console.log('向→滑动了,距离:' + (tapBegin.x - tapMove.x));
        this.setData({
          boxClass: 'box-hide'
        })
      }
      tapMove = tapBegin

    },
    //  失去焦点
    sliderOut: function (e) {
      console.log(this.compId + '被滑出了')
      this.setData({
        boxClass: 'box-hide'
      })
    }
  },
  ready: function (e) {
    console.log('组件被创建..')
  }
})
