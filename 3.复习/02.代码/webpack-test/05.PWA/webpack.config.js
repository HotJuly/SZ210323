const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

/*
    PWA(渐进式网络应用)
        当用户首次进入公司网站,会自动缓存一份网页到本地
        如果用户下次访问的时候,没有网络连接处于离线状态,会直接读取本地缓存好的网页
        俗称离线缓存

        步骤:
            1.下载npm包
            2.引入插件
            3.将当前插件添加到plugins中,声明使用
                new WorkboxPlugin.GenerateSW({
                    // 这些选项帮助快速启用 ServiceWorkers
                    // 不允许遗留任何“旧的” ServiceWorkers
                    clientsClaim: true,
                    skipWaiting: true
                })
                
            4.在项目入口文件中,粘贴代码
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => {
                        navigator.serviceWorker.register('./service-worker.js').then(registration => {
                        console.log('SW registered: ', registration);
                        }).catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                        });
                    });
                    }
*/

module.exports={
    entry:"./src/index.js",
    output:{
        path:resolve(__dirname,'./build'),
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./public/index.html"
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode:"development",
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:['.vue','.js','.json']
    }
}