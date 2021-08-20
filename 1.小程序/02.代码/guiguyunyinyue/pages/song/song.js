// pages/song/song.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于存储当前歌曲详细信息
    songObj:{},
    isPlay:false,
    songId:null,
    musicUrl:null
  },

  // 用于监视用户点击播放按钮操作,控制当前页面C3效果播放状态
  async handlePlay(){
    // console.log('handlePlay')

    // 场景区分:
    //  如果当前处于播放状态,立马让当前音频暂停状态,以及C3效果进入暂停状态
    //  如果当前处于暂停/停止状态,立马让当前音频播放状态,以及C3效果进入播放状态

    const backgroundAudioManager = wx.getBackgroundAudioManager();

    if(this.data.isPlay){
      // 说明当前音频正处于播放状态
      backgroundAudioManager.pause();
    }else{

      // 自动播放背景音频
      // 背景音频是指,用户即便把小程序最小化至后台,歌曲依旧能够继续播放

      // 1.获取全局唯一的背景音频管理器
      // const backgroundAudioManager = wx.getBackgroundAudioManager();

      // 2.通过背景音频管理器实例控制音频播放
      // 出现问题:当前歌曲详细信息songObj身上没有音频链接,需要重新请求

      let result = await req('/song/url', { id: this.data.songId });
      const url = result.data[0].url;
      // console.log('url', url)

      // 注意:背景音频想要播放歌曲,必须要传入两个属性src和title
      backgroundAudioManager.src = url;
      backgroundAudioManager.title = this.data.songObj.name;

      // 更新页面的C3效果
      this.setData({
        musicUrl: url
      })
    }

    this.setData({
      isPlay: !this.data.isPlay
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 小程序路由传参,可以通过onLoad的形参获取到,该形参是query对象
    // 小程序路由url有长度限制,此处传递整个对象数据体量太大,无法传递
    // console.log('options', options.songId)
    // let songObj = JSON.parse(options.song)

    // 通过路由传参获取到当前歌曲唯一标识
    const songId = options.songId;

    let songData= await req('/song/detail', { ids: songId});
    // console.log('songData', songData);

    this.setData({
      songObj:songData.songs[0],
      songId
    })

    wx.setNavigationBarTitle({ title: this.data.songObj.name})
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