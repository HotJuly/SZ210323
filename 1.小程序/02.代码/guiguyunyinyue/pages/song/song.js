// 错误示范
// import PubSub from '../../node_modules/pubsub-js';

import PubSub from 'pubsub-js';
import moment from 'moment';

import req from '../../utils/req.js';


// 获取全局唯一的小程序实例对象
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于存储当前歌曲详细信息
    songObj:{},
    isPlay:false,
    songId:null,
    musicUrl:null,
    currentTime:"00:00",
    durationTime:"--:--",
    currentWidth:0
  },

  // 用于请求当前歌曲最新链接信息
  async getMusicUrl(){
    let result = await req('/song/url', { id: this.data.songId });
    const url = result.data[0].url;
    // 更新页面的C3效果
    this.setData({
      musicUrl: url
    })
  },

  // 用于请求当前歌曲最新的歌曲详情
  async getMusicDetail(){
    let songData = await req('/song/detail', { ids: this.data.songId });

    this.setData({
      songObj: songData.songs[0],
      durationTime: moment(songData.songs[0].dt).format("mm:ss")
    })

    wx.setNavigationBarTitle({ title: this.data.songObj.name });
  },

  // 用于监视用户点击切换歌曲按钮,并向每日推荐页面发布数据
  switchType(event){
    const {id} = event.currentTarget;

    
    // console.log('switchType123')
    PubSub.publish('switchType', id);
  },

  // 用于监视背景音频相关操作
  addEvent(){
    this.backgroundAudioManager = wx.getBackgroundAudioManager();

    // 监视背景音频进入播放状态
    this.backgroundAudioManager.onPlay(()=>{
      // 如果当前页面歌曲和背景音频是同一首歌曲,才更新页面效果

      if (appInstance.globalData.audioId === this.data.songId) {
        // 更新当前页面C3效果
        this.setData({
          isPlay: true
        })
      }

      // 缓存当前歌曲的id和播放状态,保证下次进入当前页面C3效果正确
      appInstance.globalData.playState = true;
    })

    // 监视背景音频进入暂停状态
    this.backgroundAudioManager.onPause(() => {
      this.setData({
        isPlay: false
      })

      // 缓存当前歌曲的id和播放状态,保证下次进入当前页面C3效果正确
      appInstance.globalData.playState = false;
    })

    // 监视背景音频进度更新状态
    this.backgroundAudioManager.onTimeUpdate(() => {
      // console.log('onTimeUpdate', this.backgroundAudioManager.currentTime)
      this.setData({
        currentTime: moment(this.backgroundAudioManager.currentTime*1000).format("mm:ss"),
        currentWidth: this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration*100
      })
    })

    // 监视背景音频自然播放结束状态
    this.backgroundAudioManager.onEnded(() => {
      PubSub.publish('switchType', "next");
    })
  },

  // 用于监视用户点击播放按钮操作,控制当前页面C3效果播放状态
  async handlePlay(){
    // console.log('handlePlay')

    // 场景区分:
    //  如果当前处于播放状态,立马让当前音频暂停状态,以及C3效果进入暂停状态
    //  如果当前处于暂停/停止状态,立马让当前音频播放状态,以及C3效果进入播放状态

    // const backgroundAudioManager = wx.getBackgroundAudioManager();

    if(this.data.isPlay){
      // 说明当前音频正处于播放状态
      this.backgroundAudioManager.pause();

      // 缓存当前歌曲的id和播放状态
      // 注意：此处不需要再次缓存当前背景音频id，因为想要进入暂停逻辑，说明之前进入过播放逻辑
      appInstance.globalData.playState = false;
    }else{

      // 自动播放背景音频
      // 背景音频是指,用户即便把小程序最小化至后台,歌曲依旧能够继续播放

      // 1.获取全局唯一的背景音频管理器
      // const backgroundAudioManager = wx.getBackgroundAudioManager();

      // 2.通过背景音频管理器实例控制音频播放
      // 出现问题:当前歌曲详细信息songObj身上没有音频链接,需要重新请求

      // 如果已经请求过了,也就是说data中已经有musicUrl属性值,就不需要再次请求了
      if (!this.data.musicUrl) {
        await this.getMusicUrl();
      }
      // console.log('url', url)

      // 注意:背景音频想要播放歌曲,必须要传入两个属性src和title
      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;

      // 本段代码仅供测试自动切歌功能使用
      // this.backgroundAudioManager.startTime = 250;


      // 缓存当前歌曲的id和播放状态
      appInstance.globalData.audioId = this.data.songId;
      appInstance.globalData.playState = true;
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

    this.setData({
      songId
    })

    this.backgroundAudioManager = wx.getBackgroundAudioManager();

    this.getMusicDetail();

    // 如果当前正在播放的歌曲和当前页面是同一首歌,页面C3自动进入播放状态
    if (appInstance.globalData.playState && appInstance.globalData.audioId===songId){
      // 页面C3自动进入播放状态
      this.setData({
        isPlay:true
      })
    }

    // 在此处绑定背景音频相关的事件监听
    this.addEvent();

    // console.log('PubSub', PubSub)
    this.pubsubToken = PubSub.subscribe('sendId', async (msg, songId) => {
      console.log('sendId')
      this.setData({
        songId
      })

      this.getMusicDetail();
      await this.getMusicUrl();


      // 注意:背景音频想要播放歌曲,必须要传入两个属性src和title
      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;


      // 缓存当前歌曲的id和播放状态
      appInstance.globalData.audioId = this.data.songId;
      appInstance.globalData.playState = true;
    })

    // 此处正在测试appInstance实例传递数据
    // console.log('appInstance1', appInstance.globalData.msg)
    // appInstance.globalData.msg="我是修改之后的数据"
    // console.log('appInstance2', appInstance.globalData.msg)
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
    PubSub.unsubscribe(this.pubsubToken);
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