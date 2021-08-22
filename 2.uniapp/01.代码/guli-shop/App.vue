<script>
	import req from './utils/req.js';
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			wx.login({
				async success({code}){
					console.log('login',code);
					let openid = await req('/getOpenId',{code});
					console.log('openid',openid)
					uni.setStorage({
						key:"token",
						data:openid
					})
				}
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	/*每个页面公共css */
	@import url("./static/iconfont/iconfont.styl");
	page
		height 100%
</style>
