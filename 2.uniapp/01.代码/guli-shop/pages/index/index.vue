<template>
	<!-- 
		uniapp既可以使用小程序组件,也可以使用html标签
		但是,推荐使用小程序组件
	 -->
	<view class="indexContainer">
		<view class="header">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="search">
				<i class="iconfont icon-sousuo"></i>
				<input type="text" placeholder-class="placeholder"	placeholder="搜索商品" class="searchInput" value="" />
			</view>
			<button class="username">七月</button>
		</view>
		
		<scroll-view class="navScroll" scroll-x="true" enable-flex="true" v-if="indexData.kingKongModule">
			<view class="navItem active">
				推荐
			</view>
			<view class="navItem" v-for="kingKong in indexData.kingKongModule.kingKongList" :key="kingKong.L1Id">
				{{kingKong.text}}
			</view>
		</scroll-view>
	</view>
	<!-- swiper
	<div>indexContainer</div> -->
	<!-- <div>
		<i>123</i><i>234</i>
	</div> -->
	
	
</template>

<script>
	export default {
		// uniapp还兼容小程序的生命周期以及Vue的生命周期
		// 选择使用,看个人意愿
		// onLoad(){
		// 	console.log('onLoad')
		// },
		data(){
			return{
				indexData:{}
			}
		},
		mounted(){
			// console.log('mounted')
			 uni.request({
				 url:"/api/getIndexData",
				 success:(res)=>{
					// console.log('res',res)
					// this.setData({
					// 	indexData:res.data
					// })
					this.indexData=res.data;
				 }
			 })
		}
	}
</script>

<style lang="stylus">
	.indexContainer
		.header
			padding-top 20upx
			display flex
			align-items  center
			.logo
				width 118upx
				height 40upx
				margin 0 20upx
				flex-shrink  0
			.search
				position relative
				background  #ccc
				border-radius  10upx
				height 60upx
				flex-grow 1
				padding-left 80upx
				.iconfont
					position absolute
					left 20upx
					top 50%
					transform translateY(-50%)
				.searchInput
					height 100%
				.placeholder
					text-align center
					font-size 28upx
					text-indent -80upx
			.username
				width 140upx
				height 60upx
				font-size 24upx
				color red
				flex-shrink  0
				margin 0 20upx
		.navScroll
			// display flex
			white-space nowrap
			.navItem
				display inline-block
				width 140upx
				height 80upx
				font-size 28upx
				text-align center
				line-height 80upx
				&.active
					border-bottom 4upx solid red
					
</style>
