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
        this.setData({ W: nv })
      }
    },
    compId: {
      type: String, 
      observer: function (nv, ov) {
        this.setData({ compId: nv })
      }
    }
  },
  data: {
    // 这里是一些组件内部数据
    compId: '',
    W: 0,
    H: 96,
    boxClass: '',
  },
  methods: {
    // 这里是一个自定义方法
    sliderHover: function (e) {
      console.log(this.data.compId + '被滑动了')
      this.setData({ boxClass: 'box-show' })
    },
    sliderOver: function (e) {
      console.log(this.compId + '被滑出了')
      this.setData({ boxClass: 'box-hide' })
    }
  }
  , ready: function (e) {
    console.log('组件被创建..')
  }
})