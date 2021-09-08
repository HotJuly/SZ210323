const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:"./src/index.js",
    output:{
        path:resolve(__dirname,'./build'),
        filename:"[name].js"
    },
    /*其实webpack的能力非常的弱,他只认识js,它可以借用很多的库强化自己,从而扩展自己可以打包的文件类型 */
    /*
        面试题:loader和plugin的区别
            loader的作用帮助webpack调用某些编译核心库,帮忙解析webpack不认识文件类型
                例如:less和less-loader
            plugin的作用扩展webpack的一部分功能,这类功能一般都比较完整
    */  
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
    devServer:{
        port:9000,
        proxy:{
            '/api':{
                target:"www.atguigu.com",
                pathRewrite:{
                    '^/api':''
                }
            }
        },
        /*
            hot:true 当项目代码发生变化之后,项目会重新编译,并且刷新当前项目
            hotOnly:true 当项目代码发生变化之后,项目会重新编译,但是不会刷新当前项目

        */
        // hot:true
        // hotOnly:true
    },
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:['.vue','.js','.json']
    }
}