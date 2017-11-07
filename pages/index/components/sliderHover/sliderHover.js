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
    width: {
      type: Number,
      value: '100%'
    }
  },
  data: {
    // 这里是一些组件内部数据
    W: 0,
    H: 0,
    planClass: 'sliderHoverPlan',

  },
  methods: {
    // 这里是一个自定义方法
    sliderHover: function (e) {
      this.setData({ planClass: 'sliderHoverPlanShow' })
    }
  }
  , ready: function (e) {
    console.log('组件被创建..')
  }
})