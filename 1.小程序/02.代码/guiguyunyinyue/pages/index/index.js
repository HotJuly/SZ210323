Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 该数据用于首页轮播图展示
    banners:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      1.在哪发
        Vue中一般是在created或者mounted中发送请求
      2.怎么发
        注意:小程序中window没有值,全局对象是wx
        API:wx.request(Object object)
      3.往哪发
        查看接口文档
        需要注意的内容:
          1.接口地址
          2.请求方式
          3.请求参数
     */
    // console.log('window', window)
    console.log(1)
    wx.request({
      url:"http://localhost:3000/banner",
      data:{
        type:2
      },
      success:(res)=>{
        // console.log('res',res)
        this.setData({
          banners:res.data.banners
        })
      }
    })
    console.log(2)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})