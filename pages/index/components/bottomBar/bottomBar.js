Component({
  properties: {
    menus: {
      type: Array,      
    }
  },
  data: {
    menus: [],
  },
  methods: {
    menusChangeHandle: function (menuArray) {
      this.setData({ menus: menuArray })
    }
  }
})