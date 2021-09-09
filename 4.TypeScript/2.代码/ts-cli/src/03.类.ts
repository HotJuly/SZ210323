// (function(){
//     class Greeter {
//         // 声明属性
//         message: string
      
//         // 构造方法
//         constructor (message: string) {
//           this.message = message
//         }
      
//         // 一般方法
//         greet (): string {
//           return 'Hello ' + this.message
//         }
//       }
      
//       // 创建类的实例
//       const greeter = new Greeter('world')
//       // 调用实例的方法
//       console.log(greeter.greet())
// })();

// (function(){
//     class Person{
//         name:string;
//         protected age:number;

//         constructor(name,age){
//             this.name=name;
//             this.age=age;
//         }

//         sayHello(){
//             console.log(`我是${this.name},我今年${this.age}岁`)
//         }
//     }

//     class Student extends Person{
//         public name:string;
//         protected age:number;
//         private price:number;
//         readonly phone:number;

//         constructor(name:string,age:number,price:number,phone:number){
//             // Person.call(this,name,age)
//             super(name,age);
//             this.price = price;
//             this.phone = phone;
//         }

//         sayHello(){
//             console.log(`我是${this.name},我今年${this.age}岁,我有${this.price}钱`)
//         }
//     }

//     let s1 = new Student("xiaoming",19,10000000000,123123);
//     s1.name="xiaowang";
//     // s1.phone= 666;
//     console.log(s1)
//     s1.sayHello()
//     /*
//         public->公共的,公开的
//             设置当前属性所有地方可以通过任意手段进行读取

//         protected->受保护的
//             设置当前属性只能在当前类中和父类中访问
    
//         private->私有属性
//             设置当前属性只能够在当前类中访问
//     */
// })();

(function(){
    abstract class Animal {

        abstract cry ()
      
        run () {
          console.log('run()')
        }
      }

    //   interface IA{
    //     cry:()=>void  ;
    //     run () {
    //         console.log('run()')
    //       }
    //   }
      
      class Dog extends Animal {
        cry () {
          console.log(' Dog cry()')
        }
      }
      
    //   class Dog implements IA{
    //     cry () {
    //       console.log(' Dog cry()')
    //     }
    //   }
      
      const dog = new Dog()
      dog.cry()
      dog.run()
})();