import Vue from 'vue'
import App from './App.vue'

import router from './router';

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

// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err, vm, info)
// }

// Vue.filter('timeFilter', function (value) {
//   // 返回处理后的值
//   return value +"1"
// })

// Vue.mixin({
//   mounted(){
//     console.log('mounted',this.$options.a)
//   }
// })


// var res = Vue.compile('<h1>{{msg}}</h1>')

// new Vue({
//   data: {
//     msg: 'hello guigu!!!'
//   },
//   render: res.render
// }).$mount('#app')


/*
  可以控制Vue渲染页面结果的地方有三个:
    1.index.html文件
    2.new Vue配置对象中的template字符串
    3.new Vue配置对象中的render函数
  渲染优先级:render函数 >>> template字符串 >>> index.html
*/
new Vue({
  // el:"#app",
  // data(){
  //   return {
  //     msg: 'hello guigu!!!'
  //   }
  // },
  router,
  // template:"<h1>haha</h1>",
  render: h => h(App),
})
.$mount("#app")
