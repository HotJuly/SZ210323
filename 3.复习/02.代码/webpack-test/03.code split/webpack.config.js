const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/*
    code split
    当前问题:多个入口文件,同时依赖于一个文件,最终打包结果中,该文件的代码会存在多份,导致项目体积增大
    解决:
        多入口文件
            给当前配置对象添加optimization.splitChunks.chunks="all"就可以实现多入口文件公共代码的拆分
            问题:由于lodash.js文件太小,导致该代码不会单独拆解,还是存在多份
            解决:optimization.splitChunks.minSize=1

        单入口文件(组件懒加载)
            通过import函数配合webpack,可以实现部分代码的切割,以及后续的动态加载
*/

module.exports={
    entry:{
        main:'./src/main.js',
        // home:'./src/home.js',
    },
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
    mode:"development",
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:['.vue','.js','.json']
    },
    optimization:{
        splitChunks:{
            chunks:"all",
            minSize:1
        }
    }
}