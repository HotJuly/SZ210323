import "@/index.less";
import "@/index.css";

import $ from 'jquery'

// 面试题:如何自定义chunk名称
// /* webpackChunkName:"lodash" */
document.querySelector('#app').onclick=function(){
    import(/* webpackChunkName:"lodash" */'./lodash.js').then(({add})=>{
        console.log(add(1,6))
    })
}

console.log('hello webpack')
console.log($)