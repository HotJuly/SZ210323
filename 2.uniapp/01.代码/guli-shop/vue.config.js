// proxy的属性名是用于让开发服务器分辨清楚,当前请求到底是发给开发服务器的还是target服务器的
// target属性是用来指定转发的服务器地址(也就是真正存有数据的服务器)
// pathRewrite属性将发给开发服务器的路由地址中的部分地址替换之后,在请求目标服务器
module.exports = {
	devServer: {
		port: 8088,
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				ws: true,
				changeOrigin: true,
				pathRewrite:{
					"^/api":""
				}
			}
		}
	}
}
