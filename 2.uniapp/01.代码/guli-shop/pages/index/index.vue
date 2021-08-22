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
			<view 
			class="navItem" 
			:class="navIndex===-1?'active':''"
			@click="changeNavIndex(-1)"
			>
				推荐
			</view>
			<view class="navItem" 
			:class="navIndex===index?'active':''" 
			@click="changeNavIndex(index)"
			v-for="(kingKong,index) in indexData.kingKongModule.kingKongList" 
			:key="kingKong.L1Id">
				{{kingKong.text}}
			</view>
		</scroll-view>
		
		<scroll-view scroll-y="true" class="contentScroll">
			<Recommend :indexData="indexData" v-if="navIndex===-1"/>
			<CateList v-else/>
		</scroll-view>
	</view>
	<!-- swiper
	<div>indexContainer</div> -->
	<!-- <div>
		<i>123</i><i>234</i>
	</div> -->
	
	
</template>

<script>
	import {mapState} from 'vuex';
	import Recommend from '../../components/Recommend/Recommend.vue';
	import CateList from '../../components/CateList/CateList.vue';
	import req from '../../utils/req.js';
	export default {
		// uniapp还兼容小程序的生命周期以及Vue的生命周期
		// 选择使用,看个人意愿
		// onLoad(){
		// 	console.log('onLoad')
		// },
		data(){
			return{
				// indexData:{},
				navIndex:-1
			}
		},
		async mounted(){
			// console.log('mounted')
			 // uni.request({
				//  url:"/api/getIndexData",
				//  success:(res)=>{
				// 	// console.log('res',res)
				// 	// this.setData({
				// 	// 	indexData:res.data
				// 	// })
				// 	this.indexData=res.data;
				//  }
			 // })
			 // let result =await req("/getIndexData");
			 // // console.log(result)
			 // this.indexData = result;
			 // console.log('initData',this.initData)
			 this.$store.dispatch('getIndexData');
		},
		computed:{
			initData(){
				return this.$store.state.home.initData;
			},
			...mapState({
				indexData:(state)=>state.home.indexData
			})
		},
		methods:{
			changeNavIndex(index){
				this.navIndex = index;
			}
		},
		components:{
			Recommend,
			CateList
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
		.contentScroll
			// 小程序计算height = 屏幕100%高度 - header高度 - nav高度
			// H5计算height = 屏幕100%高度 - header高度 - nav高度 - 导航栏高度 - tabBar高度
			// 当前样式需要根据运行环境来实现不同的计算
			// 解决方案一:通过条件编译ifdef实现不同环境执行不同代码
			// 解决方案二:使用级联变量(俗称CSS变量,该功能必须支持C3的浏览器才能使用)
			/* #ifdef H5 */
			height calc(100vh - 80upx - 84upx - 88upx)
			/* #endif */
			
			/* #ifdef MP-WEIXIN */
			height calc(100vh - 80upx - 84upx)
			/* #endif */
			
			height calc(100vh - 80upx - 84upx - var(--window-top) - var(--window-bottom))
					
</style>
