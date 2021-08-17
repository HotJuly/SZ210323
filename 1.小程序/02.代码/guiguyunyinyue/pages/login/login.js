// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"17688197777",
    password:""
  },

  handlePhone(event){
    // console.log('handlePhone', event)
    // 收集用户输入数据,并更新到data中
    // 1.获取用户输入内容
    let value = event.detail.value;
    this.setData({
      phone:value
    })
  },

  handlePassword(event) {
    // console.log('handlePassword')
    let value = event.detail.value;
    this.setData({
      password: value
    })
  },

  handleInput(event) {
    /*
      小程序组件向事件回调函数内部传参
        解决:通过组件的标签属性,可以向事件回调函数内部传参
    
     */
    // console.log('handleInput', event.target.dataset.type)
    console.log('handleInput', event.target)
    let type = event.target.dataset.type;
    let value = event.detail.value;
    this.setData({
      [type]: value
    })
    // return function () {
    //   console.log('handleInput')
    // }
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