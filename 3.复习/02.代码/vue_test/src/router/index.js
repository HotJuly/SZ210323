import Vue from "vue";
// import VueRouter from "vue-router";
import JulyRouter from "july-router";

// import MyRouter from "../myRouter";

import Home from '../components/Home';
import About from '../components/About';
import Xixi from '../components/Xixi';

// Vue.use(MyRouter);
Vue.use(JulyRouter);


// export default new VueRouter({
//     mode:"history",
//     routes:[
//         {
//             path:"/home",
//             component:Home
//         },
//         {
//             path:"/about",
//             component:About,
//             children:[
//                 {
//                     path:"xixi",
//                     component:Xixi
//                 }
//             ]
//         }
//     ]
// })

export default new JulyRouter({
    mode:"history",
    routes:[
        {
            path:"/home",
            component:Home
        },
        {
            path:"/about",
            component:About,
            children:[
                {
                    path:"/about/xixi",
                    component:Xixi
                }
            ]
        }
    ]
})