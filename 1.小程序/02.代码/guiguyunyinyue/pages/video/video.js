// pages/video/video.js
import req from '../../utils/req.js';
import hasPermission from '../../utils/hasPermission.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于导航列表显示
    navList:[],
    currentId:null,
    videoList:[],
    trigger:false,
    videoId:null
  },

  // 用于监视用户点击图片,想要播放视频的操作
  switchVideo(event){
    console.log('switchVideo')

    const videoId = event.target.id;

    // 为了显示出对应的video组件,需要修改状态数据videoId
    // setData同步修改数据,异步渲染页面
    // setData第二个参数,需要是函数,该函数会在页面更新之后才会执行
    // 如果是Vue,.会使用$nextTick,可以保证某些js代码,在DOM更新之后才执行
    this.setData({
      videoId
    },()=>{
      let videoContext = wx.createVideoContext(videoId);
      videoContext.play();
    });

  },

  // 用于监视用户上拉scroll-view触底操作
  handleScrollToLower(){
    // console.log('handleScrollToLower')
    setTimeout(()=>{
      this.setData({
        videoList: [...this.data.videoList, ...this.data.videoList]
      })
    },1000)
  },

  // 用于监视用户下拉scroll-view组件操作
  async handlePullDown(){
    // console.log('handlePullDown')
    await this.getVideoList();
    this.setData({
      trigger:false
    })
  },

  // 当前函数,仅用于测试视频播放API
  testAPI(){
    // console.log('testAPI')
    // 用于测试的第一个视频id
    const id ='50A645DFDA46157CBBE0557089989D8C';

    // 用于创建对应video标签的上下文对象
    const videoContext = wx.createVideoContext(id);

    // 使用上下文对象的pause方法暂停该视频的播放
    videoContext.pause()
  },

  // 用于监视视频的播放状态,如果视频开始或者继续播放,都会触发当前函数
  handlePlay(event){
    // console.log('handlePlay')
    /*
      1.暂停上一个视频的播放(使用this.oldId来存储上一次的id)
      2.将当前的视频id记录下来,用作下次使用

      问题一:第一次播放视频,是没有上一次的
      问题二:上一次播放的视频也是自己
     */

    const id = event.target.id;

    if (this.oldId&&this.oldId!==id) {
      // 用于创建对应video标签的上下文对象
      const videoContext = wx.createVideoContext(this.oldId);

      // 使用上下文对象的pause方法暂停该视频的播放
      videoContext.pause();
    }

    this.oldId = id;
  },

  // 用于请求最新的视频列表数据
  async getVideoList(){
    //用于请求视频列表数据
    let videoListData = await req('/video/group', { id: this.data.currentId });
    let videoList = videoListData.datas.map((item) => {
      return item.data;
    })
    this.setData({
      videoList
    })

    // console.log('1')
  },

  // 用于监视用户点击导航栏操作,并动态切换导航栏下划线展示
  async changeNav(event){
    // target和currentTarget的使用,根据自定义属性存放的位置决定
    // 如果当前数据放在最内层目标对象身上,就是用event.target获取
    // 如果当前数据放在事件源身上,就是用event.currentTarget获取
    // let currentId = event.target.dataset.id;
    // console.log('currentId', currentId)
    let currentId = event.currentTarget.dataset.id;
    this.setData({
      currentId,
      videoList:[]
    })

    wx.showLoading({
      title:"正在加载,请稍等"
    })
    await this.getVideoList();
    // console.log('2')
    wx.hideLoading({});
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
  onShow:async function () {
    // 检查用户是否已经登录
    // 如果用户没有登录,弹出模态对话框,引导用户前往不同页面
    if(!hasPermission())return;


    // 用于请求导航列表数据
    let navListData = await req('/video/group/list');
    this.setData({
      navList: navListData.data.slice(0,13),
      currentId: navListData.data[0].id
    });

    // 封装请求视频列表函数
    this.getVideoList();
    // console.log('videoList', videoList)
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
  onPullDownRefresh:async function () {
    // console.log('onPullDownRefresh')
    // 用于请求导航列表数据
    let navListData = await req('/video/group/list');
    this.setData({
      navList: navListData.data.slice(0, 13),
      currentId: navListData.data[0].id
    });

    // 封装请求视频列表函数
    this.getVideoList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 想要触发该事件函数,必须要有系统滚动条
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from,target}) {
    // console.log('onShareAppMessage', from, target)
    /*
      当用户点击右上角转发按钮,应该转发的内容是小程序logo,小程序名称
      当用户点击某个button按钮进行转发,应该转发的内容是当前视频图片和名称
      问题:如何区分用户触发当前事件监听的渠道
      解决:可以通过形参中的from属性,判断用户触发的渠道

      问题:如何自定义转发内容
      解决:通过return一个对象,可以实现转发内容的自定义效果
    */
    if(from==="menu"){
      // 说明用户是点击右上角转发进入的
      return {
        title:"硅谷云音乐",
        imageUrl:"/static/images/dazuo.jpeg",
        page:"/pages/index/index"
      }
    } else if (from === "button") {
      // 说明用户是点击button按钮进入的
      // target相当于之前的event.target,此处target可以获取到button组件
      // 注意:自定义属性的属性名只能是小写,大写也会默认转为小写
      const {title,imageurl} = target.dataset;
      return {
        title,
        imageUrl: imageurl,
        page: "/pages/video/video"
      }
    }
  }
})