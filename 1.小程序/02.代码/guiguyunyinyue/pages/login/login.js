// pages/login/login.js
import req from '../../utils/req.js';
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
      event.target就是最内层的子元素,即是触发者
      event.currentTarget就是绑定事件监听的事件源
     */
    // console.log('handleInput', event.target.dataset.type)
    // console.log('handleInput', event.target)
    let type = event.target.dataset.type;
    let value = event.detail.value;
    this.setData({
      [type]: value
    })
    // return function () {
    //   console.log('handleInput')
    // }
  },

  // 监视用户点击登录按钮,发送登录请求
  async handleLogin(){
    // console.log('handleLogin')
    // 1.收集数据(已经收集在data中了)
    const {phone,password} = this.data;

    // 2.前台表单验证
    if(!phone.trim()){
      //弹窗提示用户,请输入手机号,并且逻辑到此为止
      wx.showToast({
        title:"手机号不能为空,请输入手机号",
        icon:"none"
      })
      return;
    }

    if (!password.trim()) {
      //弹窗提示用户,请输入密码,并且逻辑到此为止
      wx.showToast({
        title: "密码不能为空,请输入密码",
        icon: "none"
      })
      return;
    }

    // 3.发送请求
    /*
      状态码情况:
        1.帐号错误 400
        2.密码错误 502
        3.登陆成功 200
     */
    let result = await req('/login/cellphone',{
      phone,
      password
    });

    console.log('result',result)

    // 4.成功做什么
    // 提示用户登录成功,并回到个人中心页面
    // if(result.code===200){
    //   // 登陆成功
    // }else if(result.code===400){
    //   // 帐号错误
    // } else if (result.code === 502) {
    //   // 密码错误
    // }

    // 5.失败做什么
    // 提示用户失败信息
    const code = result.code;
    const codeFn = {
      200(){
        // 该函数用于登录成功状态
        // console.log('登录成功')
        wx.showToast({
          icon: "none",
          title: '登录成功,即将跳转',
        });
        wx.switchTab({
          url:"/pages/personal/personal"
        })
      },
      400() {
        // 该函数用于帐号错误状态
        console.log('帐号错误')
        wx.showToast({
          icon: "none",
          title: '帐号错误,请检查',
        });
      },
      502() {
        // 该函数用于密码错误状态
        // console.log('密码错误')
        wx.showToast({
          icon:"none",
          title: '密码错误,请检查',
        });
      }
    }
    codeFn[code]&&codeFn[code]();
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