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

  // 用于监视用户点击导航栏操作,并动态切换导航栏下划线展示
  changeNav(event){
    // target和currentTarget的使用,根据自定义属性存放的位置决定
    // 如果当前数据放在最内层目标对象身上,就是用event.target获取
    // 如果当前数据放在事件源身上,就是用event.currentTarget获取
    // let currentId = event.target.dataset.id;
    // console.log('currentId', currentId)
    let currentId = event.currentTarget.dataset.id;
    this.setData({
      currentId
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
  onShow:async function () {
    // 用于请求导航列表数据
    let navListData = await req('/video/group/list');
    this.setData({
      navList: navListData.data.slice(0,13),
      currentId: navListData.data[0].id
    });

    //用于请求视频列表数据
    let videoListData = await req('/video/group',{id:this.data.currentId});
    let videoList = videoListData.datas.map((item)=>{
      return item.data;
    })
    this.setData({
      videoList
    })
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
  onShareAppMessage: function () {

  }
})