import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 自定义合并策略
// 可以对所有组件的配置对象进行统一修改
// Vue.config.optionMergeStrategies.a=function(a,b,c){
//   // console.log('a',a,b,c)
//   return b+1;
// }

// 开启或者关闭Vue调试工具
// Vue.config.devtools=true;

/*
  面试题:你是如何维护项目上线之后出现的错误的
    分解:如何得知用户浏览器中项目出现的错误

    1.得知用户出现的报错
      以前项目中:window.onerror=function(error){}
      Vue项目中使用Vue.config.errorHandler可以捕获到当前项目出现的错误
        并提供错误信息,错误组件实例,错误位置

    2.将错误发送至公司专用服务器
      通过ajax请求,将出现的报错信息发送给公司服务器

    3.公司后端将用户出现的错误信息汇总发给你
      根据报错信息进行项目维护

*/

Vue.config.errorHandler = function (err, vm, info) {
  console.log(err, vm, info)
}

new Vue({
  render: h => h(App),
}).$mount('#app')
