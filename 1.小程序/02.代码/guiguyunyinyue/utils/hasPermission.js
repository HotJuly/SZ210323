export default function(){
  if (!wx.getStorageSync('cookie')) {
    wx.showModal({
      title: "请先登录",
      content: "该功能需要登陆之后才能使用",
      confirmText: "去登陆",
      cancelText: "回到首页",
      success({ confirm }) {
        // 无论用户点击确定还是取消都会触发success回调
        // console.log('success', res)
        if (confirm) {
          wx.navigateTo({
            url: "/pages/login/login"
          })
          return true;
        } else {
          wx.switchTab({
            url: "/pages/index/index"
          })
          return false;
        }

      }
    })
  }
}