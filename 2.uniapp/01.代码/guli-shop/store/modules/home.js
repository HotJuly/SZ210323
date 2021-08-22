import req from '../../utils/req.js';
const state = {
	initData:"我是home模块的初始数据",
	indexData:{
		
	}
}

const mutations = {
	SETINDEXDATAMUTATION(state,indexData){
		state.indexData = indexData;
	}
}

const actions = {
	async getIndexData({commit}){
		let result =await req("/getIndexData");
		commit('SETINDEXDATAMUTATION',result)
		
	}
}

const getters = {
	
}

export default {
	state,
	mutations,
	actions,
	getters
}