// pages/video/video.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于导航列表显示
    navList:[],
    currentId:null,
    videoList:[]
  },

  async getVideoList(){
    //用于请求视频列表数据
    let videoListData = await req('/video/group', { id: this.data.currentId });
    let videoList = videoListData.datas.map((item) => {
      return item.data;
    })
    this.setData({
      videoList
    })

    console.log('1')
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
    console.log('2')
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
  onShareAppMessage: function ({ from,target}) {
    console.log('onShareAppMessage', from, target)
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