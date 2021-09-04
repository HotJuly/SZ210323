const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}

/*
nextTick源码重点:
  1.由于nextTick源码中具有开关pending,所以每次调用nextTick都会检测上次是否已经调用过
    多个nextTick只会开启一个.then微任务，在该微任务中会遍历callbacks数组,
    调用目前已传入的所有nextTick回调函数

  2.Vue更新状态数据是同步更新,但是更新DOM是异步更新
    更新的时机是在微任务.then中
      更新DOM流程:
        1.当用户修改data中的数据的时候,会触发update方法去更新DOM
        2.update方法会调用queueWatcher方法
        3.queueWatcher方法内部会调用nextTick,并将真正更新DOM的方法flushSchedulerQueue,
          交给nextTick作为回调函数使用
        4.当项目的主线程代码执行结束,会执行nextTick开启的.then微任务,从而更新视图
    
    之所以Vue敢保证nextTick的回调函数一定能获取到最新的DOM结构,
    是因为更新DOM的函数就在nextTick队列的第一位,而后续交给nextTick的回调函数都会排在他之后执行
*/

