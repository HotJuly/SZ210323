// pages/recomendSong/recommendSong.js
import hasPermission from '../../utils/hasPermission.js';
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month:"--",
    day:"--",
    recommendList:[]
  },

  // 用于监视用户点击推荐列表中的歌曲,跳转至歌曲页面
  toSong(event){
    // console.log('toSong',event.currentTarget.dataset.song)
    let songId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/song/song?songId='+songId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 获取今天的日期
    let date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    // console.log(month, day)
    this.setData({
      month,
      day
    });

    if (!hasPermission())return;
    // console.log('1')
    let result = await req('/recommend/songs');
    // console.log('result', result)
    this.setData({
      recommendList: result.recommend
    })
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