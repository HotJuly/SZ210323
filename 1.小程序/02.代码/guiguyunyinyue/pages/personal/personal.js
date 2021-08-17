// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance:0,
    moveTransition:"",
    userInfo:{}
  },

  toLogin(){
    if(!this.data.userInfo.nickname) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  // 用于监视用户手指按下事件
  handleTouchStart(event){
    // touches数组用于收集当前屏幕上所有的手指信息
    // changedTouches数组用于收集当前屏幕上正在变化的手指信息
    // console.log('handleTouchStart', event)
    this.startY  = event.touches[0].clientY;
    // console.log(startY)
    this.setData({
      moveTransition:""
    })
  },

  // 用于监视用户手指移动事件
  handleTouchMove(event) {
    // console.log('handleTouchMove', event)
    let moveY = event.touches[0].clientY;
    let moveDistance = moveY - this.startY;
    if(moveDistance>80 || moveDistance<0)return;
    this.setData({
      moveDistance
    })
  },

  // 用于监视用户手指抬起事件
  handleTouchEnd(event) {
    // console.log('handleTouchEnd', event)
    this.setData({
      moveDistance:0,
      moveTransition:"transform 1s"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let userInfo = JSON.parse(wx.getStorageSync('userInfo')||'{}');
    // console.log('userInfo', userInfo)
    this.setData({
      userInfo
    })
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