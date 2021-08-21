# UNIAPP文件介绍

1. manifest.json
   1. 当前项目的说明书,其中还可以配置一些编译相关内容
   2. 该文件类似于小程序中的project.config.json
2. pages.json
   1. 相当于小程序中的app.json+所有页面的json
   2. 其中可以配置pages属性,用来注册页面路由
   3. 其中globalStyle相当于之前的window属性,可以控制导航栏的变化
3. main.js+App.vue
   1. 当前文件在注册小程序,并书写全局公共样式
   2. 相当于小程序中的app.js+app.wxss
4. unpackage文件夹
   1. 该文件夹是当用户将uniapp项目编译成小程序运行时,才会出现
   2. 实际上微信开发者工具就是运行当前文件夹内部的代码
   3. 注意:千万别修改该文件夹内部代码,否则很容易丢失
5. pages文件夹
   1. 相当于小程序的pages文件夹,专门用于存放所有的页面
   2. index文件夹
      1. 该文件夹内部存放一个页面的vue文件
      2. template标签对应以前的index.wxml
      3. script标签对应以前的index.js
      4. style标签对应以前的index.wxss

