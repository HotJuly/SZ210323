const fs = require('fs');

/*
    事件轮询机制,是在主线程代码全部执行结束之后才会开始运行
    事件轮询机制的入口是阶段1,定时器阶段
    如果事件轮询机制发现无事可做,最终最停留在阶段4,I/O阶段

    node中nextTick微任务优先级最高,比then优先级更高,可以插队执行

    Node中有6个宏任务队列,2个微任务队列

*/

// setTimeout(()=>{
//     console.log('setTimtout')
// },0)

// fs.readFile('./01.原型.html',()=>{
//     console.log('readFile success')

//     setTimeout(()=>{
//         console.log('setTimtout1')
//     },0)
    
//     setImmediate(()=>{
//         console.log('setImmediate1')
//     })
// })

// setImmediate(()=>{
//     console.log('setImmediate')
// })

Promise.resolve().then(()=>{
        console.log('Promise1')

        process.nextTick(()=>{
            console.log('nextTick')
        })
        Promise.resolve().then(()=>{
            console.log('Promise2')
        })
        Promise.resolve().then(()=>{
            console.log('Promise3')
        })
})

Promise.resolve().then(()=>{
        console.log('Promise1')
})
process.nextTick(()=>{
    console.log('nextTick')
})
Promise.resolve().then(()=>{
    console.log('Promise2')
})
Promise.resolve().then(()=>{
    console.log('Promise3')
})