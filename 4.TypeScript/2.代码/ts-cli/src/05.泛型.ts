(function(){
    /*
        现在具有一个函数叫做createArray
            接收两个参数
                第一个参数可以为任意类型数据
                第二个参数必须是数字类型
        功能:返回一个全新的数组,该数组的内容长度为第二个参数,内容是第一个参数
        createArray(1,5)=>[1,1,1,1,1]
    

        泛型:
            相当于TS中新增的一种传入形参的方式
    */
    // function createArray <T> (value:T,count:number) :T[] {
    //     let arr:T[] = [];

    //     for(let index = 0;index<count;index++){
    //         arr.push(value);
    //     }

    //     return arr;
    // }

    // console.log(createArray<number>(1,5))
    // console.log(createArray<string>("1",5))
    // let newArr = createArray<number>(1,5);
    // newArr[0].toFixed(2);

})();

(function(){
    // function swap<C,V>(a:C, b:V):[C,V]{
    //     return [a, b]
    // }
    //   const result = swap<string, number>('abc', 123)
    //   console.log(result[0].length, result[1].toFixed())
})();

(function(){
    //     class User {
    //         id?: number; //id主键自增
    //         name: string; //姓名
    //         age: number; //年龄
        
    //         constructor (name, age) {
    //             this.name = name
    //             this.age = age
    //         }
    //     }

    //     interface IBaseCRUD<T>{
    //         data: T[]
    //         add:(user:T)=>void
    //         getById:(id:number)=>T
    //     }
      
    //   class UserCRUD implements IBaseCRUD<User>{
    //     data: User[] = []
        
    //     add(user: User): void {
    //       user = {...user, id: Date.now()}
    //       this.data.push(user)
    //       console.log('保存user', user.id)
    //     }
      
    //     getById(id: number): User {
    //       return this.data.find(item => item.id===id)
    //     }
    //   }
      
      
    //   const userCRUD = new UserCRUD()
    //   userCRUD.add(new User('tom', 12))
    //   userCRUD.add(new User('tom2', 13))
    //   console.log(userCRUD.data)

    //   class Student{
    //     id?: number; //id主键自增
    //     name: string; //姓名
    //     age: number; //年龄
    //     price:number;//身价
    
    //     constructor (name, age,price) {
    //         this.name = name
    //         this.age = age
    //         this.price = price
    //     }
    // }

    
    // class StudentCRUD{
    //     data: Student[] = []
        
    //     add(user: Student): void {
    //       user = {...user, id: Date.now()}
    //       this.data.push(user)
    //       console.log('保存user', user.id)
    //     }
      
    //     getById(id: number): Student {
    //       return this.data.find(item => item.id===id)
    //     }
    //   }

})();

(function(){
    // class GenericNumber<T>{
    //     zeroValue:T
    //     add: (x:T, y:T) => T
    //   }
      
    //   let myGenericNumber = new GenericNumber<number>()
    //   myGenericNumber.zeroValue = 0
    //   myGenericNumber.add = function(x, y) {
    //     return x + y 
    //   }
    //   myGenericNumber.add(1,2)
      
    //   let stringNumeric = new GenericNumber<string>()
    //   stringNumeric.zeroValue = 'abc'
    //   stringNumeric.add = function(x, y) { 
    //     return x + y
    //   }
    //   stringNumeric.add("1",'2')
      
    //   console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))
})();

(function(){

    interface IT{
        length:number;
    }

    function fn2<T extends IT>(x:T){
        console.log(x.length)
    }
      fn2<string>("str")
      fn2<number>(123)
})();