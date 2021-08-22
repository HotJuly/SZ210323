import Vue from 'vue';
import VueX from 'vuex';
import home from './modules/home.js';
import cart from './modules/cart.js';

Vue.use(VueX);

export default new VueX.Store({
	modules:{
		home,
		cart
	}
})