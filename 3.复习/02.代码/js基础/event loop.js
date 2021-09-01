const fs = require('fs');
// setTimeout(()=>{
//     console.log('setTimeout')
// },1)

// setImmediate(()=>{
//     console.log('setImmediate')
// })

// fs.readFile('./01.原型.html',function(){
//     console.log('readFile')
//     setTimeout(()=>{
//         console.log('setTimeout')
//     },1)
    
//     setImmediate(()=>{
//         console.log('setImmediate')
//     })
// })

// Promise.resolve().then(()=>{
//     console.log('Promise1')
//     // 在node中nextTick微任务是优先级最高的,相当于SVIP
//     // node中具有六个宏任务队列
//     // node中具有两个微任务队列,nextTick专用一个
//     // node执行队列的特点,如果已经进入了某个队列中,必须将当前队列满足条件的任务全部执行结束,才会切换到下一个队列
//     process.nextTick(()=>{
//         console.log('nextTick')
//     })

    
//     Promise.resolve().then(()=>{
//         console.log('Promise2')
//     })
    
// })


process.nextTick(()=>{
    console.log('nextTick1')   

    Promise.resolve().then(()=>{
        console.log('Promise1')
    })

    process.nextTick(()=>{
        console.log('nextTick2')
    })

    
})






// process.nextTick(()=>{
//     console.log('nextTick')
// })


// Promise.resolve().then(()=>{
//     console.log('Promise2')
// })