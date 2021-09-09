import RouterView from './components/view';
import RouterLink from './components/link';

function install(Vue){
    Vue.component(RouterView.name,RouterView);
    Vue.component(RouterLink.name,RouterLink);
}

export default install