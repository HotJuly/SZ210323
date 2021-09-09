/*
    number
    string
    boolean
    undefined
    null

    ES6+新增:
    symbol
    bigint
*/

let num:number = 123;
// num="str";   由于当前num变量声明只能存放数字,所以该处会报错

let str:string = "hello";
// str=undefined;

let flag:boolean = true;

/* 
    在TS的非严格模式下,undefined和null是所有数据的子类
    在TS的严格模式下,undefined和null就不再是所有数据的子类
*/
let un:undefined = undefined;

let nu:null = null;

// function A(value:string){
//     return value.length
// }

// A(123)

let arr:Array<string> = [];
arr[0]="hello";
arr[1]="123";

// arr[0].

let arr2:number[] = [];
arr2[0]=123
// arr2[0]="123"

/*
    元组是特殊的数组
        特殊在,元组的长度和类型都进行了约束
*/

let arr3:[string,number,boolean] = ["hello",123,true];
// arr3[0].length;
// arr3[1].toFixed(0)
// arr3[3] = 5;

enum City {
    quanzhou=10,
    xiamen=18,
    beijing,
    深圳=20
}

const obj={
    name:"xiaoming",
    city:"beijing"
}
const obj2={
    name:"xiaoming",
    city:2
}
const obj3={
    name:"xiaoming",
    city:null
}

obj3.city=City['quanzhou'];

console.log(City[obj2.city],obj3.city)
console.log(City)

/*
    any类型尽量少用,如果大部分代码都是any,那么ts的类型检测就相当于失效了
*/
let o:any = 123;
o=true;

/*
    void代表不能存在任何值
*/
let v:void = undefined;

function forEach():number{
    console.log('forEach')
    return 123;
}

function map():Array<string>{
    console.log('forEach')
    return ['forEach'];
}

forEach()
map()

let obj4:object= {

}

let a1:string|number = 123;

function getLength(value:string|number){
    /*
        如果数据是字符串类型,就返回字符串的length属性
        如果数据是数字类型,就返回该数字

        类型断言
            跟VScode解析器声明某个变量的类型
    */
   if((<string>value).length){
       return (value as string).length
   }else{
       return value
   }
}


getLength(123);

/*
    当一个变量声明的时候没有声明类型,同时还进行了赋值操作
    他会自动将赋值的结果的数据类型,作为该变量的类型约束
*/
let num1;
num1= 123;
num1="hello";
