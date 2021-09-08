const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/*
    tree shaking
        将多余的无用代码去除
    当前问题:lodash.js中提供三个函数,但是main.js只使用到其中的一个,最终打包结果还是具有所有的函数
    解决:
        使用TerserPlugin插件可以实现树摇功能
        将mode改为production,其中会自动启用TerserPlugin插件
        注意:想使用该插件,模块化语法必须是ES6

*/

module.exports={
    entry:"./src/main.js",
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
        })
    ],
    mode:"production",
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:['.vue','.js','.json']
    }
}