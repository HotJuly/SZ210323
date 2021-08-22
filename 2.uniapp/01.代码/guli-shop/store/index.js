import Vue from 'vue';
import VueX from 'vuex';
import home from './modules/home.js';

Vue.use(VueX);

export default new VueX.Store({
	modules:{
		home
	}
})