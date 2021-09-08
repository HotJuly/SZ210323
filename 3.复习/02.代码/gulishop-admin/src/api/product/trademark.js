import request from '@/utils/request';

export default {
    // DELETE /admin/product/baseTrademark/remove/{id}
    // 根据品牌id删除对应品牌
    deleteTradeMark(id){
        return request.delete(`/admin/product/baseTrademark/remove/${id}`)
    },
    
    // POST /admin/product/baseTrademark/save
    // 新增品牌
    // {
    //     "logoUrl": "string",
    //     "tmName": "string"
    //  }
    // PUT /admin/product/baseTrademark/update
    // 修改品牌
    // {
    //     "id": 0,                 品牌ID(id属性是后端生成的,也就是说添加品牌不需要传入id,修改才需要)
    //     "logoUrl": "string",     品牌LOGO链接
    //     "tmName": "string"       品牌名称
    // }
    addOrUpdate(trademark){
        if(trademark.id){
            // 有id说明在修改品牌
            // 请求的时候,传参一定要传第二个参数(代表需要传过去的请求体参数)
            return request.put(`/admin/product/baseTrademark/update`,trademark);
        }else{
            // 没有id说明在新增品牌
            return request.post(`/admin/product/baseTrademark/save`,trademark);
        }
    },
    
    // GET /admin/product/baseTrademark/{page}/{limit}
    // 根据当前页数page和当前页面显示条数limit,获取对应的品牌列表
    getTradeMarkList(page,limit){
        return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
    },
    
    // GET /admin/product/baseTrademark/getTrademarkList
    // 获取平台中所有的品牌
    getTradeMarks(){
        return request.get(`/admin/product/baseTrademark/getTrademarkList`)
    }
}
// export default 100;

// export const a = 100;
// export const b = 200;

/*
一共有几种模块化语法:4种
    1.commonjs->仅用于Node
    2.AMD->运用于浏览器
    3.CMD->运用于浏览器
    4.ES6 modules

es6模块化语法关键字:
    1.import
    2.export
    3.default

es6暴露方式:
    1.默认暴露      =>暴露出去的是什么东西?     对象
        export default 100;

        真正暴露的内容:对象
            {
                default:100
            }
        引入方式

        完整语法:import {default as a} from './path'
        简写语法:import a from './path'

    2.分别暴露      =>暴露出去的是什么东西?     对象
        export const a = 100;
        export const b = 100;

        真正暴露的内容:对象
            {
                a:100,
                b:200
            }

        引入方式
        完整语法:import * as obj from './path'
        简写语法:import {a,b} from './path'

        问题:分别暴露和默认暴露可不可以同时使用?
        export default 100;
        export const a = 100;
        export const b = 100;

        真正暴露的内容:对象
            {
                default:100,
                a:100,
                b:200
            }

        引入方式
        语法:import { default as c , a ,b} from '@/api/product/trademark';

    3.统一暴露
        export default {
            a:100,
            b:200
        };
*/