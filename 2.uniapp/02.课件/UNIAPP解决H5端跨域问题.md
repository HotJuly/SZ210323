# UNIAPP解决H5端跨域问题

1. 使用HBuilderX的内置浏览器运行项目
   1. 跨域问题是浏览器搞的鬼,所以HBuilder的内置浏览器没有相关检测
2. 在vue.config.js中配置代理规则
   1. 配置详情,参考vue-cli的配置
3. 在manifest.json中配置代理规则
   1. 流程:manifest.json->h5->devServer
   2. 此配置参考webpack文档配置

