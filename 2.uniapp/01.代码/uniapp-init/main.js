import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// mp->mini program
//	type->类型
// 说明,当前App组件代表整个小程序
App.mpType = 'app'

// 相当于小程序app.js中调用App()注册整个小程序
const app = new Vue({
    ...App
	// onLaunch: function() {
	// 	console.log('App Launch')
	// },
	// onShow: function() {
	// 	console.log('App Show')
	// },
	// onHide: function() {
	// 	console.log('App Hide')
	// }
})
app.$mount()
