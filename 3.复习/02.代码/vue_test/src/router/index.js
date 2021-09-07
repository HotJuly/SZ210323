import Vue from "vue";
// import VueRouter from "vue-router";

import MyRouter from "../myRouter";

import Home from '../components/Home';
import About from '../components/About';

Vue.use(MyRouter);


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

export default new MyRouter({
    mode:"history",
    routes:[
        {
            path:"/home",
            component:Home
        },
        {
            path:"/about",
            component:About,
            // children:[
            //     {
            //         path:"xixi",
            //         component:Xixi
            //     }
            // ]
        }
    ]
})