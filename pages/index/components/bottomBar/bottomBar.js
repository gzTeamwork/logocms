Component({
  properties: {
    activeUrl: {
      type: String,
      observer: function(nv, ov) {
        if (nv != ov) {
          this.setData({
            activeUrl: nv
          });
        }

      }
    },
    // menus: {
    //   type: Array,
    //   observer: function(nv, ov) {
    //     if (nv != ov && nv.length > 1) {
    //       this.setData({
    //         menus: nv
    //       })
    //     }
    //   }
    // }
  },
  data: {
    activeUrl: '',
    menus: [{
      url: 'pages/index/index',
      icon: '../../../../assets/imgs/ticket.png',
      active: '../../../../assets/imgs/ticket_active.png',
      label: '提交需求'
    }, {
      url: 'pages/index/user',
      icon: '../../../../assets/imgs/user.png',
      active: '../../../../assets/imgs/user_active.png',
      label: '我'
    }],
    methods: {

    },

  },
  ready() {
    console.log(this.data.menus);
  }
});
