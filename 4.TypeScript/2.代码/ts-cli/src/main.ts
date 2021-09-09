(function () {
    /*
        现在有一个对象,要求该对象必须具有name和age和sex属性,可能具有phone属性,其中sex不能修改
    */

    /*
        普通接口
            主要作用,提前声明该类型的对象具有哪些属性,如果对象缺少任何属性都会报错
            接口内的所有属性,如果没有特殊情况都必须传入
            ?代表该属性可选,可传可不传

        面试题:readonly和const的区别
            const定义的是常量(变量),他主要是禁止变量的值发生变化
                可以修改对象内部的数据,只要不改变地址值就没事
                const obj={}
                obj.name=123;
            readonly定义的是属性,当前属性的值不能发生变化
    */
    interface IPerson {
        name: string;
        age: number;
        phone?: number;
        readonly sex: any;
    }


    let obj: IPerson = {
        name: "xiaoming",
        age: 18,
        phone: 123123,
        sex: {
            address: 123
        }
    }

    // let obj2:IPerson = {
    //     name:"xiaoming",
    //     age:18,
    //     sex:"女"
    // }

    obj.sex.address = 345
})();

(function () {

    /*
        函数接口
            可以约束函数所接收到的参数数据类型,还有函数的返回值类型
    */
    interface IA {
        (a: number, b: string): string
    }

    // function A(a,b):IA{
    //     return a+b
    // }

    const A: IA = function (a, b) {
        return a + b
    }


    A(1, "2")
})();

(function () {
    /*
        类接口
            可以通过接口约束一个class中所必须具有的方法和属性
    
    */
    // interface Alarm {
    //     id:string;
    //     alert(): any;
    // }

    // interface B{
    //     username:string;
    // }

    // class Car implements Alarm,B {
    //     id:string;
    //     username:string;

    //     constructor(id,username){
    //         this.id=id;
    //         this.username=username;
    //     }
    //     alert(){
    //         console.log('alert')
    //     }
    // }
    // new Car('粤A000001','chh')

    

    interface B{
        username:string;
    }

    interface Alarm extends B {
        id:string;
        alert(): any;
    }

    class Car implements Alarm {
        id:string;
        username:string;

        constructor(id,username){
            this.id=id;
            this.username=username;
        }
        alert(){
            console.log('alert')
        }
    }
    new Car('粤A000001','chh')
})();