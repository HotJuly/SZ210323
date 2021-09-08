// import trademark from "./product/trademark";
// import user from './user';

// export const trademark = trademark;
// export const user = user;

// 此处代码相当于上述1和4的结合体,引入之后直接暴露
// export {default as user } from "./user";
export {default as trademark} from "./product/trademark";
export {default as category} from "./product/category";
export {default as attr} from "./product/attr";
export {default as spu} from "./product/spu";
export {default as sku} from "./product/sku";
// this.$API.category.getCategory1()

/*
    1.引入所有模块的api
        import trademark from "./product/trademark";
        import user from './user';

    2.将引入的api对象分别暴露出去
        export const trademark = trademark;
        export const user = user;

    3.最终index.js暴露出去的内容
        {
            trademark:{
                getTradeMarkList(){},
                addOrUpdate(){},
                deleteTradeMark(){}
            },
            user:{
                login(){},
                logout(){},
                getInfo(){}
            }
        }
*/