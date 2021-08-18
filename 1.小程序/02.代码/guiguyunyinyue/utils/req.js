// 该文件用于封装请求函数,并向外提供一个用于发送请求的工具函数
/*
  封装代码核心思想
  保留公共部分,提取变化内容

  封装函数
    1.保留重复出现的代码片段
    2.将内部每次调用都不相同的内容,通过形参传入
    3.谁调用,谁传入

  封装组件
    1.保留重复出现的代码片段(wxml+wxss+部分js)
    2.将内部每次展示的不同内容,通过标签属性向内部传入数据
    3.谁使用,谁传入
 */
import config from './config.js';
export default function (url, data={}, method="GET") {
  // let result;
  return new Promise((resolve,reject) => {
    wx.request({
      url: config.mpHost + url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookie')
      },
      success: (res) => {
        // console.log('res', res)
        // 不是每个cookie都要保存,我们只需要登录接口返回的cookie
        // if (url ==="/login/cellphone"){}
        if (data._Login) {
          wx.setStorage({
            key: 'cookie',
            data: res.cookies.find((cookie) => {
              return cookie.startsWith('MUSIC_U');
            })
          })
        }
        // result = res;

        // 此操作等同于axios中响应拦截器的return response.data
        resolve(res.data)
        // this.setData({
        //   banners: res.data.banners
        // })
      }
    })
  })
  // return result;
}