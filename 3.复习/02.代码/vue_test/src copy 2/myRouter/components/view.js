import Vue from 'vue';
export default {
    name:"RouterView",
    functional:true,
    render:(_,{parent})=>{
        //获取创建虚拟DOM的函数
        const createElement = parent.$createElement;

        /* 如何获取到需要显示的对应组件
            通过router.mapRoutes对象+当前路由地址,就可以得到需要显示的组件
        */
        const path = Vue.prototype.$route.path;
        const component = Vue.prototype.$router.mapRoutes[path];

        return createElement(component);
    }
}