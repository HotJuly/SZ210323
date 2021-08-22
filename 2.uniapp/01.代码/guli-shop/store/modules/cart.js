import Vue from 'vue'
const state = {
	cartList:[
    {
		"selected":true,
		"count":4,
        "promId": 0,
        "showPoints": false,
        "itemTagList": [
            {
                "itemId": 1535004,
                "tagId": 128111157,
                "freshmanExclusive": false,
                "name": "暖冬特惠",
                "subType": 204,
                "forbidJump": false,
                "type": 2
            }
        ],
        "rank": 1,
        "id": 1535004,
        "sellVolume": 4001,
        "primaryPicUrl": "https://yanxuan-item.nosdn.127.net/f79906f1b1fe86420ea40473de66ec0e.png",
        "soldOut": false,
        "sortFlag": 0,
        "commentCount": 0,
        "onSaleTime": 1538101761748,
        "picMode": 1,
        "commentWithPicCount": 0,
        "underShelf": false,
        "status": 2,
        "couponConflict": true,
        "forbiddenBuy": false,
        "promotionDesc": "暖冬特惠",
        "limitedFlag": 204,
        "pieceNum": 0,
        "itemSizeTableDetailFlag": false,
        "forbidExclusiveCal": false,
        "rewardShareFlag": false,
        "updateTime": 1575893634989,
        "showCommentEntrance": true,
        "pieceUnitDesc": "件",
        "specialPromTag": "",
        "counterPrice": 299,
        "categoryL2Id": 0,
        "retailPrice": 209,
        "primarySkuPreSellPrice": 0,
        "preLimitFlag": 0,
        "itemPromValid": true,
        "promTag": "暖冬特惠",
        "source": 0,
        "points": 0,
        "primarySkuPreSellStatus": 0,
        "extraServiceFlag": 0,
        "flashPageLink": "",
        "autoOnsaleTimeLeft": 0,
        "innerData": {},
        "saleCenterSkuId": 0,
        "pointsStatus": 0,
        "extraPrice": "",
        "colorNum": 0,
        "showTime": 0,
        "autoOnsaleTime": 0,
        "preemptionStatus": 1,
        "isPreemption": 0,
        "zcSearchFlag": false,
        "name": "男式色拉姆内衣套装2.0",
        "appExclusiveFlag": false,
        "itemType": 1,
        "listPicUrl": "https://yanxuan-item.nosdn.127.net/c2eeb1b872af1b8efc179a7515aacdaa.png",
        "pointsPrice": 0,
        "simpleDesc": "色拉姆发热面料，加厚升级",
        "seoTitle": "",
        "newItemFlag": false,
        "buttonType": 0,
        "primarySkuId": 1636062,
        "displaySkuId": 1636056,
        "productPlace": "",
        "itemSizeTableFlag": false
    },
    {
		"selected":false,
		"count":9,
        "promId": 0,
        "showPoints": false,
        "itemTagList": [
            {
                "itemId": 1536001,
                "tagId": 128111157,
                "freshmanExclusive": false,
                "name": "暖冬特惠",
                "subType": 204,
                "forbidJump": false,
                "type": 2
            }
        ],
        "rank": 1,
        "id": 1536001,
        "sellVolume": 3634,
        "primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
        "soldOut": false,
        "sortFlag": 0,
        "commentCount": 0,
        "onSaleTime": 1538101896296,
        "picMode": 1,
        "commentWithPicCount": 0,
        "underShelf": false,
        "status": 2,
        "couponConflict": true,
        "forbiddenBuy": false,
        "promotionDesc": "暖冬特惠",
        "limitedFlag": 204,
        "pieceNum": 0,
        "itemSizeTableDetailFlag": false,
        "forbidExclusiveCal": false,
        "rewardShareFlag": false,
        "updateTime": 1575894115275,
        "showCommentEntrance": true,
        "pieceUnitDesc": "件",
        "specialPromTag": "",
        "counterPrice": 299,
        "categoryL2Id": 0,
        "retailPrice": 209,
        "primarySkuPreSellPrice": 0,
        "preLimitFlag": 0,
        "itemPromValid": true,
        "promTag": "暖冬特惠",
        "source": 0,
        "points": 0,
        "primarySkuPreSellStatus": 0,
        "extraServiceFlag": 0,
        "flashPageLink": "",
        "autoOnsaleTimeLeft": 0,
        "innerData": {},
        "saleCenterSkuId": 0,
        "pointsStatus": 0,
        "extraPrice": "",
        "colorNum": 0,
        "showTime": 0,
        "autoOnsaleTime": 0,
        "preemptionStatus": 1,
        "isPreemption": 0,
        "zcSearchFlag": false,
        "name": "女式色拉姆内衣套装2.0",
        "appExclusiveFlag": false,
        "itemType": 1,
        "listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
        "pointsPrice": 0,
        "simpleDesc": "色拉姆发热面料，加厚升级",
        "seoTitle": "",
        "newItemFlag": false,
        "buttonType": 0,
        "primarySkuId": 1634105,
        "displaySkuId": 1634104,
        "productPlace": "",
        "itemSizeTableFlag": false
    }
	]
}

const mutations = {
	ADDSHOPITEMMUTATION(state,good){
		// state.cartList
		/*
			1.如果当前购物车中没有该商品,就将当前商品信息存入购物车列表
			2.如果当前购物车中存在该商品,就将当前商品数量+1
		*/
		// console.log('ADDSHOPITEMMUTATION')
		// 通过find方法遍历整个数组,找到id相同的商品
		let shopItem = state.cartList.find((shopItem)=>{
			return shopItem.id === good.id
		})
		if(shopItem){
			shopItem.count+=1;
			console.log('shopItem',shopItem)
		}else{
			console.log('good',good)
			// 当前商品信息中没有count属性,需要新增一个
			// 此处注意,该属性是后续新增属性,不是一个响应式属性,所以当该数据发生变化,页面不会重新渲染
			// good.count=1;
			Vue.set(good,'count',1);
			state.cartList.push(good);
		}
	},
	CHANGECOUNTMUTATION(state,{flag,index}){
		/*
			1.通过下标找到对应商品,并修改对应商品的数量
				注意:如果当前用户点击-1按钮,而且商品数量已经是1,那么应该直接删除该商品
		
		*/
		// console.log('CHANGECOUNTMUTATION',flag,index)
		let shopItem = state.cartList[index];
		if(flag){
			shopItem.count+=1;
		}else{
			if(shopItem.count===1){
				state.cartList.splice(index,1);
			}else{
			shopItem.count-=1;
			}
		}
	},
	CHANGESELECTEDMUTATION(state,{selected,index}){
		state.cartList[index].selected=selected;
	},
	CHANGESELECTEDALLMUTATION(state,selected){
		state.cartList.forEach((shopItem)=>{
			shopItem.selected=selected
		})
	}
}

const actions = {
}

const getters = {
	isSelectedAll(state){
		/*
			1.如果购物车列表中所有商品都处于选中状态,那么全选按钮也处于选中状态
			2.如果购物车列表中有一个商品处于未选中状态,那么全选按钮也处于未选中状态
			3.如果购物车中没有商品,那么全选按钮也处于未选中状态
			4.返回数据类型:布尔值
		*/
	   if(!state.cartList.length)return false;
	   let result = state.cartList.every((shopItem)=>{
		   return shopItem.selected
	   })
	   return result;
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}