const Koa = require('koa');
const KoaRouter = require('koa-router');

/*
	1.获取app,创建服务器应用实例
		const app = express();
	
	2.将服务器应用实例运行在电脑的某个端口上,并监听该端口
		app.listen(端口号,回调函数)
		
	3.注册路由
		app.get(路由地址,回调函数)
		回调函数接收参数:
			1.request->请求报文对象
			2.response->响应报文对象
			3.next->执行下一个中间键
		返回数据:
			response.send(需要返回的数据)
*/

// 1.创建服务器应用实例
	const app = new Koa();
	
//3.注册路由
// 3.1创建路由器实例对象
	const router = new KoaRouter();
	
//	3.2声明使用中间件函数
/*
	app.use(中间件函数)
	中间件函数的用处:
		1.修改请求报文数据
		2.修改响应报文配置
		3.检测当前请求是否符合服务器要求

*/
	// 声明使用所有的路由
	app.use(router.routes());
	
// 	3.3正式注册路由
/*		回调函数接收参数:
			1.ctx->请求报文对象request+响应报文对象response
			3.next->执行下一个中间键
		返回数据:
			ctx.body=需要返回的数据
*/
	router.get('/test',function(ctx,next){
		console.log('/test success')
		ctx.body="/test success"
	})
	
	// 当前路由,用于返回首页相关数据
	const indexData = require('./datas/index.json');
	router.get('/getIndexData',function(ctx,next){
		// console.log('/test success')
		ctx.body=indexData
	})
	
//	2.将服务器应用实例运行在电脑的某个端口上,并监听该端口
// 	node中一般都是错误优先机制
	app.listen(3001,function(error){
		if(error){
			console.log('当前服务器启动失败',error)
		}else{
			console.log('当前服务器启动成功,启动与http://localhost:3001');
		}
	})