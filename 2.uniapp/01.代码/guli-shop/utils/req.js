/*
	在H5端,基础路径必须是代理的标识,也就是"/api"
	在小程序端,基础路径必须是完整服务器域名,也就是"http://localhost:3001"
	总结:基础路径的值需要根据当前运行环境发生变化
	
	通过API:uni.getSystemInfoSync()可以获取到当前设备的系统信息
	其中返回的对象身上具有一个platform属性
		1.属性值为ios,说明当前在ios的移动端设备上
		2.属性值为devtools,说明当前在小程序上运行
*/
import config from './config.js';
let baseUrl;
// console.log('uni.getSystemInfoSync()',uni.getSystemInfoSync())


//方案一:
// 获取到当前运行环境
// const platform = uni.getSystemInfoSync().platform;

// if(platform==="ios"){
// 	baseUrl = config.h5Host;
// }else if(platform === "devtools"){
// 	baseUrl = config.mpHost;
// }

//方案二:通过uniapp指定指令可以在不同环境下运行不同代码(条件编译)
//指令 #ifdef	和	#ifndef

// 当前代码仅在h5端执行
// #ifdef H5
	baseUrl = config.h5Host;
// #endif

// 当前代码仅在微信小程序端执行
// #ifdef MP-WEIXIN
	baseUrl = config.mpHost;
// #endif


export default function(url,data={},method="GET") {
	return new Promise((resolve) => {
		uni.request({
			url: baseUrl + url,
			data,
			method,
			header:{
				token:uni.getStorageSync('token')
			},
			success: (res) => {
				resolve(res.data)
			}
		})
	})
}
