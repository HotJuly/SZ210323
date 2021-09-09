// (function(){
//     /*
//         当前函数接受两个参数,数据类型都是数字
//         当前函数调用返回结果数据类型,也是数字
    
//     */
//     function add(x:number, y:number) :number{
//         return x + y
//     }

//     // let add2 : (x:number,y:number)=>number = function(x:number, y:number) :number{
//     //     return x + y
//     // }

    
//     let add2 = function(x:number, y:number = 4,z?:number) :number{
//         return x + y
//     }

    
//     let add3 = function(x:number,...args:number[]) :void{
//     }

//     add2(1,2,3);
//     add2(1)

    
//     add2(1,2,3);

// })();


(function(){
/*  
    如果两个参数都是字符串,我就输出字符拼接结果
    如果两个参数都是数字,我就输出相乘的结果

*/

/*
    函数重载

*/

function add(a:number,b:number)
function add(a:string,b:string)
function add(a,b){
    if(typeof a==="string"&&typeof b==="string"){
        return a+b
    }
    if(typeof a==="number"&&typeof b==="number"){
        return a*b
    }
}

add(1,2)
add("1","2")
add(1,"2")


})();