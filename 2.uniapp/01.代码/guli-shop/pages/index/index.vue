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
	</view>
	<!-- swiper
	<div>indexContainer</div> -->
	<!-- <div>
		<i>123</i><i>234</i>
	</div> -->
</template>

<script>
	export default {}
</script>

<style lang="stylus">
	.indexContainer
		.header
			padding-top 20rpx
			display flex
			align-items  center
			.logo
				width 118rpx
				height 40rpx
				margin 0 20rpx
				flex-shrink  0
			.search
				position relative
				background  #ccc
				border-radius  10rpx
				height 60rpx
				flex-grow 1
				padding-left 80rpx
				.iconfont
					position absolute
					left 20rpx
					top 50%
					transform translateY(-50%)
				.searchInput
					height 100%
				.placeholder
					text-align center
					font-size 28rpx
					text-indent -80rpx
			.username
				width 140rpx
				height 60rpx
				font-size 24rpx
				color red
				flex-shrink  0
				margin 0 20rpx
</style>
