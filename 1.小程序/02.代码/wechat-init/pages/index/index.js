// pages/index/index.js
// 注册页面,可以重复注册,每次调用都会生成一个页面实例
const citySelector = requirePlugin('citySelector');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"我是初始化数据",
    userInfo:{},
    cityInfo:""
  },

  getLocation(){
    const key = 'BZ7BZ-QQWCU-DHWV2-BFJJG-B2JZF-KSBT3'; // 使用在腾讯位置服务申请的key
    const referer = '七月入栈'; // 调用插件的app的名称
    const hotCitys = '北京,上海,深圳,武汉'; // 用户自定义的的热门城市

    wx.navigateTo({
      url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`
    })
  },

  handleClick(){
    // console.log('handleClick')
    // wx.navigateTo({
    //   url: '/pages/log/log',
    // })
    // wx.redirectTo({
    //   url: '../log/log',
    // })


    if (wx.canIUse('getUserProfile')) {
      wx.getUserProfile({
        desc: "用于项目测试",
        success: (detail) => {
          // console.log('res', res)
          this.setData({
            userInfo: detail.userInfo
          })
        },
        fail(){
          console.log('fail')
        }
      })
    }
  },

  handleParent() {
    console.log('handleParent')
  },

  handleClick1(){
    this.setData({
      msg: "我是修改之后的数据"
    })
  },

  getUserInfo(res){
    // 该回调函数可以成功触发,但是无论用户点击确定还是取消都会触发
    // 框架想要给开发者传递数据,一般在两个位置上:1.this 2.形参
    // 通过res.detail.userInfo可以获取到用户个人信息
    // 当用户授权成功一次之后,授权状态会在手机上缓存,后续不会在出现授权弹窗
    console.log('getUserInfo', res)
    // 判断当前用户点击的到底是哪个按钮
    if (res.detail.rawData){
      // 能进入这里就说明用户点击了允许授权
      this.setData({
        userInfo: res.detail.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // debugger
    // console.log('msg', this.data.msg)
    // this.data.msg ="我是修改之后的数据"
    // this.setData({
    //   msg:"我是修改之后的数据"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据1"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据2"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据3"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据4"
    // })
    // console.log('msg', this.data.msg)

    // wx.getUserInfo({
    //   success:(detail)=>{
    //     // console.log('detail', detail)
    //     this.setData({
    //       userInfo: detail.userInfo
    //     })
    //   }
    // })

    // wx.getUserProfile({
    //   desc:"用于项目测试",
    //   success:(res)=>{
    //     console.log('res', res)
    //   }
    // })
    // console.log('1', wx.canIUse('getUserProfile'))
    // if (wx.canIUse('getUserProfile')){
    //   wx.getUserProfile({
    //     desc:"用于项目测试",
    //     success:(res)=>{
    //       console.log('res', res)
    //     }
    //   })
    // }

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
    const selectedCity = citySelector.getCity();
    console.log('selectedCity', selectedCity)
    if (selectedCity) {
      this.setData({
        cityInfo: selectedCity.fullname
      })
    }
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