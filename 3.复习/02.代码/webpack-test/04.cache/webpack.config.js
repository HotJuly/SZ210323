const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
    缓存
        当用户第二次开始请求之前请求过的文件,自动使用上次的文件
        强缓存
            max-Age=360000
            如果用户请求某个资源,该资源距离上一次请求没超过3600000毫秒,会自动使用上次的缓存文件

            注意:
                1.强缓存的请求状态是多少?        200
                2.强缓存只要没有超过最大时间限制,就不会发送请求给服务器

        协商缓存
            last-modified="该文件最后的修改时间"
            e-tag="当前文件的hash值"
            协商缓存每次都会发送请求,将本地内存中存储的文件的hash值和最后修改时间,传递给服务器
            服务器接收,并检查这两个数据与服务器上对应文件的hash值和最后修改时间,
                如果相同,返回304状态,通知浏览器使用上次加载的文件
                如果不相同,直接返回当前服务器最新文件

        注意:当前文件资源是否要进行网络缓存,不是前端决定的,是服务器决定的

        解决强缓存的缺点
            前言:一个文件是否使用缓存的依据,是根据文件名判断的
            实现效果,如果服务器代码没有发生变化,就是用之前的缓存文件
                    如果服务器代码发生变化,就使用最新的文件
            
            只要让每次打包的文件名不同,就可以解决这个问题
            hash值:每次项目构建都会有一个当前编译的唯一值

            chunkhash值:构建项目时候,每个入口文件以及后续依赖的唯一值

            contenthash值:构建项目中,每个文件的唯一值

            

*/

module.exports={
    entry:"./src/main.js",
    output:{
        path:resolve(__dirname,'./server/build'),
        filename:"[name].[contenthash:8].js"
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test:/\.css$/,
                use:[
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css"
        })
    ],
    mode:"development",
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:['.vue','.js','.json']
    },
    optimization: {
        runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`
        }
    }
}