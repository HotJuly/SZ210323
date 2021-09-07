import Vue from 'vue';
import install from './install';

function deepMapRoutes(routes) {
    // this=>this.mapRoutes
    routes.forEach((routeObj)=>{
        const path = routeObj.path;
        this[path] = routeObj.component;

        if(routeObj.children&&routeObj.children.length){
            deepMapRoutes.call(this,routeObj.children);
        }
    })
}

class MyRouter {
    constructor(options) {
        this.$options = options;

        this.routes = options.routes;

        this.history = window.history;

        // 用来映射路由路径和路由组件
        // 类似于策略模式写法
        this.mapRoutes = {};

        /*
            该函数的目的:是为了提高后续路由的查询速度
            初始结构:
                [
                    {
                        path:"/home",
                        component:Home
                    },
                    {
                        path:"/about",
                        component:About,
                        children:[
                            {
                                path:"xixi",
                                component:Xixi
                            }
                        ]
                    }
                ]

                转换为:
                    {
                        "/home":Home,
                        "/about":About,
                        "/about/xixi":Xixi
                    }
        */
        deepMapRoutes.call(this.mapRoutes,this.routes);
        // console.log(this.mapRoutes);

        Vue.prototype.$router = this;

        Vue.prototype.$route = Vue.observable({
            path:window.location.pathname
        })
    }

    push(path){
        // 可以修改浏览器历史记录栈,以及浏览器地址栏展现效果
        this.history.pushState({},'',path);

        // 同时将响应式属性$route.path修改为当前的路由地址
        Vue.prototype.$route.path = path;
    }
}

MyRouter.install = install;

export default MyRouter;

// new MyRouter({
//     routes:[
//         {
//             path:"/home",
//             component:"Home"
//         },
//         {
//             path:"/about",
//             component:"About",
//             children:[
//                 {
//                     path:"/about/xixi",
//                     component:"Xixi"
//                 }
//             ]
//         }
//     ]
// })