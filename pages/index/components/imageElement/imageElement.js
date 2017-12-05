// pages/index/components/imageElement.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrl: {
      type: String,
      observer: function(nv, ov) {
        if (nv != ov) {
          this.setData({ imageUrl: nv });
        }
      }
    },
    imageStyle: {
      type: String
    },
    imageClass: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: "",
    imageMode: "aspectFill"
  },
  /**
   * 组件的方法列表
   */
  methods: {
    iamgeTapHandle: function(e) {
      console.log(e);
      wx.showModal({
        title: "提示",
        content: "是否保存该图片?",
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            var imgs = e.currentTarget.dataset.url;
            console.log(imgs);
            wx.getImageInfo({
              src: imgs,
              success: function(res) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.path,
                  success(res) {
                    wx.showToast({
                      title: "保存成功",
                      icon: "success",
                      duration: 2000
                    });
                  }
                });
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    // 保存图片至本地
    keepImgToLocal: function(e) {
      var imgs = e.currentTarget.dataset.url;
      console.log(imgs);
      wx.getImageInfo({
        src: imgs,
        success: function(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.path,
            success(res) {
              wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2000
              });
            }
          });
        }
      });
    }
  }
});
