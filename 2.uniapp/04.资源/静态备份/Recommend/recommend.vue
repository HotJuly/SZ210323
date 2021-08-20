<template>
	<view class="recommendContainer">
		<swiper class="bannerSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image class="bannerImg" src="../../static/images/index/1.webp" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image class="bannerImg"  src="../../static/images/index/2.webp" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image class="bannerImg"  src="../../static/images/index/3.webp" mode=""></image>
			</swiper-item>
		</swiper>
		
		<!-- policyDescList区域 -->
		<view class="policyDescList">
			<view class="policyDescItem">
				<image src="https://yanxuan.nosdn.127.net/a03dd909803b9ac032eba58b7253a2f6.png" mode=""></image>
				<text>网易严选品牌</text>
			</view>
			<view class="policyDescItem">
				<image src="https://yanxuan.nosdn.127.net/a03dd909803b9ac032eba58b7253a2f6.png" mode=""></image>
				<text>网易严选品牌</text>
			</view>
			<view class="policyDescItem">
				<image src="https://yanxuan.nosdn.127.net/a03dd909803b9ac032eba58b7253a2f6.png" mode=""></image>
				<text>网易严选品牌</text>
			</view>
		</view>
		
		<!-- nav区域 -->
		<view class="nav">
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
			<view class="navItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<view>居家生活</view>
			</view>
		</view>
		
		<!-- CategoryList导航指南区域 -->
		<CategoryList />
	</view>
</template>

<script>
	import CategoryList from '../categoryList/categoryList.vue';
	export default{
		name:"Recommend",
		components:{
			CategoryList
		}
	}
</script>

<style lang="stylus">
	.recommendContainer
		.bannerSwiper
			.bannerImg
				width 100%
				height 100%
		.policyDescList
			display flex
			justify-content space-around
			.policyDescItem
				image
					width 32upx
					height 32upx
					vertical-align middle
				text
					font-size 24upx
					vertical-align middle
		.nav
			display flex
			flex-wrap wrap
			.navItem
				width 20%
				text-align center
				image
					width 110upx
					height 110upx
				view
					font-size 24upx
</style>
