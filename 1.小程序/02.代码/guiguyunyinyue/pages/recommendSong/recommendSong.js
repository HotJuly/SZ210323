// pages/recomendSong/recommendSong.js
import PubSub from 'pubsub-js';

import hasPermission from '../../utils/hasPermission.js';
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month:"--",
    day:"--",
    recommendList:[],
    currentIndex:null
  },

  // 用于监视用户点击推荐列表中的歌曲,跳转至歌曲页面
  toSong(event){
    // console.log('toSong',event.currentTarget.dataset.song)
    let { id: songId,index} = event.currentTarget.dataset;

    this.setData({
      currentIndex:index
    })

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

    // 订阅switchType,用于接收song页面发来的数据(用户点击的是上一首还是下一首)
    // 注意:PubSub的回调函数的形参,第一个是消息名称,第二个才是真正传递的数据
    PubSub.subscribe('switchType', (msg,data)=>{
      console.log('switchType', msg, data)
      /*
        当前通过data中的currentIndex属性,可以知道当前是哪一首歌
          如果需要上一首歌曲数据,就将currentIndex-1,并对recommendList进行读取即可
          如果需要下一首歌曲数据,就将currentIndex+1,并对recommendList进行读取即可
      
       */
      let {currentIndex,recommendList} =this.data;
      if(data==="next"){
        if(currentIndex===recommendList.length-1){
          currentIndex=0;
        }else{
          currentIndex += 1;
        }
      } else {
        if (currentIndex === 0) {
          currentIndex = recommendList.length - 1;
        } else {
          currentIndex -= 1;
        }
      }

      this.setData({
        currentIndex
      })

      const newSongId = recommendList[currentIndex].id;

      PubSub.publish('sendId',newSongId);
    });
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